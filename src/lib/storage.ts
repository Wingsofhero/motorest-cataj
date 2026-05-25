import { areaByKey, areas, createInitialEnemies } from "../data/areas";
import { AppState, AreaKey, AreaProgress, DailyLog, MapAsset } from "../types";
import { getSession, supabase } from "./supabase";

const localStorageKey = "hero-wings-mvp-state";

export function createInitialState(): AppState {
  const progress = areas.reduce(
    (acc, area) => {
      acc[area.key] = {
        area: area.key,
        resourceAmount: 0,
        assets: createInitialEnemies(area),
      };
      return acc;
    },
    {} as Record<AreaKey, AreaProgress>,
  );

  return { progress, logs: [] };
}

export async function loadAppState(): Promise<AppState> {
  const localState = loadLocalState();

  if (!supabase) {
    return localState;
  }

  const session = await getSession();
  if (!session?.user) {
    return localState;
  }

  const [progressResponse, assetsResponse, logsResponse] = await Promise.all([
    supabase.from("areas_progress").select("*").eq("user_id", session.user.id),
    supabase.from("map_assets").select("*").eq("user_id", session.user.id),
    supabase.from("daily_logs").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }),
  ]);

  if (progressResponse.error || assetsResponse.error || logsResponse.error) {
    return localState;
  }

  const nextState = createInitialState();

  progressResponse.data?.forEach((row) => {
    const area = row.area_name as AreaKey;
    if (nextState.progress[area]) {
      nextState.progress[area].resourceAmount = row.resource_amount ?? 0;
    }
  });

  assetsResponse.data?.forEach((row) => {
    const area = row.area_name as AreaKey;
    if (nextState.progress[area]) {
      nextState.progress[area].assets.push({
        id: row.id,
        area,
        type: row.asset_type,
        unitType: row.unit_type,
        x: Number(row.x),
        y: Number(row.y),
        imageUrl: isImageUrl(row.image_url) ? row.image_url : undefined,
        emoji: resolveEmoji(area, row.asset_type, row.unit_type),
      });
    }
  });

  nextState.logs =
    logsResponse.data?.map((row) => ({
      id: row.id,
      area: row.area_name,
      transcript: row.transcript,
      activities: row.activities_json ?? [],
      gainedResources: row.gained_resources ?? 0,
      createdAt: row.created_at,
    })) ?? [];

  saveLocalState(nextState);
  return nextState;
}

export async function persistAppState(state: AppState): Promise<void> {
  saveLocalState(state);

  if (!supabase) return;

  const session = await getSession();
  if (!session?.user) return;

  const userId = session.user.id;
  await supabase.from("users").upsert({
    id: userId,
    email: session.user.email ?? "",
  });

  const progressRows = Object.values(state.progress).map((progress) => ({
    user_id: userId,
    area_name: progress.area,
    resource_amount: progress.resourceAmount,
    updated_at: new Date().toISOString(),
  }));

  await supabase.from("areas_progress").upsert(progressRows, {
    onConflict: "user_id,area_name",
  });
}

export async function persistNewAsset(asset: MapAsset): Promise<void> {
  if (!supabase) return;

  const session = await getSession();
  if (!session?.user) return;

  await supabase.from("map_assets").insert({
    id: asset.id,
    user_id: session.user.id,
    area_name: asset.area,
    asset_type: asset.type,
    unit_type: asset.unitType,
    x: asset.x,
    y: asset.y,
    image_url: asset.imageUrl ?? null,
  });
}

export async function persistDailyLog(log: DailyLog): Promise<void> {
  if (!supabase) return;

  const session = await getSession();
  if (!session?.user) return;

  await supabase.from("daily_logs").insert({
    id: log.id,
    user_id: session.user.id,
    area_name: log.area,
    transcript: log.transcript,
    activities_json: log.activities,
    gained_resources: log.gainedResources,
    created_at: log.createdAt,
  });
}

function loadLocalState(): AppState {
  const fallback = createInitialState();
  const raw = localStorage.getItem(localStorageKey);
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw) as AppState;
    return mergeWithInitialState(parsed);
  } catch {
    return fallback;
  }
}

function mergeWithInitialState(state: AppState): AppState {
  const initial = createInitialState();
  areas.forEach((area) => {
    const existing = state.progress?.[area.key];
    if (existing) {
      initial.progress[area.key] = {
        ...existing,
        assets: ensureInitialEnemies(area.key, existing.assets),
      };
    }
  });

  return {
    progress: initial.progress,
    logs: state.logs ?? [],
  };
}

function ensureInitialEnemies(area: AreaKey, assets: MapAsset[]): MapAsset[] {
  const enemyIds = new Set(assets.filter((asset) => asset.type === "enemy").map((asset) => asset.id));
  const seededEnemies = createInitialEnemies(areas.find((item) => item.key === area)!);
  return [...assets, ...seededEnemies.filter((enemy) => !enemyIds.has(enemy.id))];
}

function saveLocalState(state: AppState): void {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function isImageUrl(value: string | null): value is string {
  if (!value) return false;
  return value.startsWith("http") || value.startsWith("/") || value.startsWith("data:image");
}

function resolveEmoji(area: AreaKey, assetType: string, unitType: string): string | undefined {
  const definition = areaByKey[area];
  if (assetType === "enemy") return definition.enemyEmoji;
  if (unitType === "basic" || unitType === "advanced" || unitType === "strong") {
    return definition.friendlyEmojis[unitType];
  }
  return undefined;
}
