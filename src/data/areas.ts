import { AreaDefinition, AreaKey, MapAsset } from "../types";

export const areas: AreaDefinition[] = [
  {
    key: "body",
    name: "Telo",
    resource: "Vitalita",
    shortText: "Energia, sila a zdravé návyky.",
    theme: "from-red-950 via-stone-950 to-zinc-950",
    background: "linear-gradient(135deg, #3b1111 0%, #1b2b24 50%, #0c0d12 100%)",
    cardEmoji: "🛡️",
    enemyEmoji: "🦴",
    friendlyEmojis: { basic: "⚔️", advanced: "🏹", strong: "🛡️" },
  },
  {
    key: "mind",
    name: "Myseľ",
    resource: "Mana",
    shortText: "Sústredenie, učenie a jasnosť.",
    theme: "from-indigo-950 via-slate-950 to-zinc-950",
    background: "linear-gradient(135deg, #111c44 0%, #172333 50%, #0d1016 100%)",
    cardEmoji: "🔮",
    enemyEmoji: "👁️",
    friendlyEmojis: { basic: "📘", advanced: "🪄", strong: "🧙" },
  },
  {
    key: "heart",
    name: "Srdce",
    resource: "Svetlo",
    shortText: "Vzťahy, láskavosť a odvaha cítiť.",
    theme: "from-rose-950 via-neutral-950 to-zinc-950",
    background: "linear-gradient(135deg, #401225 0%, #33221f 52%, #0e0d12 100%)",
    cardEmoji: "❤️",
    enemyEmoji: "💔",
    friendlyEmojis: { basic: "🕯️", advanced: "🌹", strong: "💎" },
  },
  {
    key: "world",
    name: "Svet",
    resource: "Zlato",
    shortText: "Práca, peniaze a vplyv navonok.",
    theme: "from-amber-950 via-stone-950 to-zinc-950",
    background: "linear-gradient(135deg, #3a2609 0%, #263322 55%, #101014 100%)",
    cardEmoji: "🏰",
    enemyEmoji: "🪓",
    friendlyEmojis: { basic: "🧱", advanced: "🏇", strong: "👑" },
  },
  {
    key: "soul",
    name: "Duša",
    resource: "Esencia",
    shortText: "Ticho, zmysel a vnútorná pravda.",
    theme: "from-violet-950 via-neutral-950 to-zinc-950",
    background: "linear-gradient(135deg, #25113d 0%, #163233 52%, #0b0c12 100%)",
    cardEmoji: "✨",
    enemyEmoji: "🌑",
    friendlyEmojis: { basic: "🪷", advanced: "🌙", strong: "⭐" },
  },
];

export const areaByKey = areas.reduce(
  (acc, area) => ({ ...acc, [area.key]: area }),
  {} as Record<AreaKey, AreaDefinition>,
);

const enemyPositions = [
  { x: 18, y: 22 },
  { x: 74, y: 18 },
  { x: 58, y: 42 },
  { x: 28, y: 66 },
  { x: 80, y: 72 },
];

export function createInitialEnemies(area: AreaDefinition): MapAsset[] {
  return enemyPositions.map((position, index) => ({
    id: `${area.key}-enemy-${index + 1}`,
    area: area.key,
    type: "enemy",
    unitType: "enemy",
    x: position.x,
    y: position.y,
    emoji: area.enemyEmoji,
  }));
}

export const unitShop = [
  { unitType: "basic" as const, name: "Základná jednotka", cost: 2 },
  { unitType: "advanced" as const, name: "Pokročilá jednotka", cost: 4 },
  { unitType: "strong" as const, name: "Silná jednotka", cost: 7 },
];
