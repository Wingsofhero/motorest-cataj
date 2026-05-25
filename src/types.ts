export type AreaKey = "body" | "mind" | "heart" | "world" | "soul";

export type AssetType = "enemy" | "friendly" | "building";

export type UnitTier = "basic" | "advanced" | "strong" | "enemy" | "building";

export interface AreaDefinition {
  key: AreaKey;
  name: string;
  resource: string;
  shortText: string;
  theme: string;
  background: string;
  cardEmoji: string;
  enemyEmoji: string;
  friendlyEmojis: Record<Exclude<UnitTier, "enemy" | "building">, string>;
}

export interface MapAsset {
  id: string;
  area: AreaKey;
  type: AssetType;
  unitType: UnitTier;
  x: number;
  y: number;
  imageUrl?: string;
  emoji?: string;
}

export interface AreaProgress {
  area: AreaKey;
  resourceAmount: number;
  assets: MapAsset[];
}

export interface ActivityScore {
  text: string;
  score: number;
}

export interface DailyLog {
  id: string;
  area: AreaKey;
  transcript: string;
  activities: ActivityScore[];
  gainedResources: number;
  createdAt: string;
}

export interface AppState {
  progress: Record<AreaKey, AreaProgress>;
  logs: DailyLog[];
}
