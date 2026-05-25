import buffetImage from "./assets/buffet.png";
import burgerImage from "./assets/burger-dessert.png";
import driveInImage from "./assets/drive-in.png";
import heroAsset from "./assets/motorest-hero.png";

export type MenuCategory = {
  key: string;
  label: string;
  title: string;
  description: string;
  items: string[];
};

export type AssistantTopic = "menu" | "drive" | "family" | "contact";

export const heroImage = heroAsset;
export const driveInPhoto = driveInImage;

export const site = {
  name: "Motorest Cataj",
  displayName: "Motorest Čataj",
  category: "Moderný motorest pri D1",
  slogan: "Poctivé jedlo na ceste aj mimo nej.",
  intro:
    "Domáca kuchyňa, rýchla obsluha, príjemný interiér a široký výber jedál pre vodičov, rodiny aj turistov.",
  rating: "4,3 / 5",
  reviewsCount: "2 800+",
  address: "D1, 900 83 Čataj",
  phone: "0904 555 777",
  phoneHref: "tel:+421904555777",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Motorest%20Cataj%20D1%20900%2083%20Cataj",
  mapEmbed:
    "https://www.google.com/maps?q=D1%2C%20900%2083%20Cataj%2C%20Slovakia&output=embed",
  openingHours: "Denne od 10:00",
  payment: ["Platobné karty", "NFC mobilné platby", "Hotovosť"],
  parking: ["Bezplatné parkovisko", "Dostatok miest", "Bezbariérové státie"],
  accessibility: ["Vstup", "Toalety", "Parkovanie", "Sedenie"],
  highlights: [
    "Veľký výber jedál formou bufetu",
    "Čerstvé šaláty a domáce dezerty",
    "Výborné burgre a rýchle snacky",
    "Moderné čisté priestory",
    "Rýchle vybavenie aj počas špičky",
    "Drive In pre krátku zastávku",
  ],
  audiences: ["Rodiny s deťmi", "Turisti", "Vodiči na dlhých trasách", "Skupiny aj jednotlivci"],
};

export const menuCategories: MenuCategory[] = [
  {
    key: "food",
    label: "Jedlá",
    title: "Široký výber počas celého dňa",
    description: "Raňajky, obedy, večere, malé jedlá aj poctivé teplé porcie z bufetu.",
    items: ["Raňajky", "Obedy", "Večere", "Vegetariánske jedlá", "Vegánske možnosti", "Snacky"],
  },
  {
    key: "fresh",
    label: "Čerstvé",
    title: "Šalátový bar, burgre a dezerty",
    description: "Jedlá, ktoré si hostia môžu nakombinovať podľa chuti a tempa cesty.",
    items: ["Čerstvé šaláty", "Burgre", "Domáce dezerty", "Tiramisu", "Sezónne prílohy"],
  },
  {
    key: "drinks",
    label: "Nápoje",
    title: "Káva, čaje aj nápoje k jedlu",
    description: "Rýchla ranná káva, pokojné posedenie aj klasická ponuka ku večeri.",
    items: ["Kvalitná káva", "Výber čajov", "Pivo", "Víno", "Nealkoholické nápoje"],
  },
  {
    key: "services",
    label: "Služby",
    title: "Všetko pre pohodlnú zastávku",
    description: "Priestor je pripravený na krátku pauzu, rodinný obed aj rýchly nákup so sebou.",
    items: ["Jedlo na mieste", "Jedlo so sebou", "Vonkajšie sedenie", "Drive In", "Bezplatné parkovanie"],
  },
];

export const gallery = [
  {
    title: "Bufet a čerstvý výber",
    description: "Teplé jedlá, šaláty a prílohy pripravené tak, aby ste nemuseli čakať.",
    image: buffetImage,
  },
  {
    title: "Burgre a domáce dezerty",
    description: "Rýchle jedlo na cestu aj sladká bodka ku káve.",
    image: burgerImage,
  },
  {
    title: "Drive In pri D1",
    description: "Pohodlné riešenie, keď potrebujete dobré jedlo bez dlhej prestávky.",
    image: driveInImage,
  },
];

export const reviews = [
  "Jedlo bolo čerstvé, chutné, veľa šalátov na výber.",
  "Atmosféra top, skvelé jedlo a veľmi príjemná obsluha.",
  "Burger bol vynikajúci a priestor ma úplne uchvátil.",
  "Tiramisu bolo jedno z najlepších, aké som kedy jedol.",
  "Aj keď bolo parkovisko plné, nemuseli sme dlho čakať.",
];

export const assistantReplies: Record<AssistantTopic, { title: string; body: string; action: string; href: string }> = {
  menu: {
    title: "Dnešný výber",
    body: "Najrýchlejšia voľba je bufet, šalátový bar alebo burger. Výber si viete poskladať podľa chuti priamo na mieste.",
    action: "Pozrieť výber",
    href: "#menu",
  },
  drive: {
    title: "Rýchla zastávka",
    body: "Drive In je vhodný, keď idete po D1 a chcete jedlo so sebou bez dlhého čakania.",
    action: "Navigovať",
    href: site.mapUrl,
  },
  family: {
    title: "Pokojné posedenie",
    body: "Interiér aj vonkajšie sedenie sú vhodné pre rodiny, skupiny aj jednotlivcov na dlhšej prestávke.",
    action: "Rezervovať",
    href: "#rezervacia",
  },
  contact: {
    title: "Priamy kontakt",
    body: `Najrýchlejšie sa dovoláte na čísle ${site.phone}.`,
    action: "Zavolať",
    href: site.phoneHref,
  },
};
