# Lokálna webová šablóna

React + Vite + Tailwind prototyp jednostránkového webu pre malé firmy. Aktuálny demo obsah je pripravený pre Motorest Čataj.

## Rýchly náhľad bez inštalácie

Otvor `local-preview.html` v prehliadači alebo spusti lokálny server:

```bash
node server.js
```

## Spustenie

```bash
npm install
npm run dev
```

## Ako meniť klienta

Hlavný obsah je v `src/siteData.ts` v objektoch `site`, `menuCategories`, `gallery`, `reviews` a `assistantReplies`.

Pri novom klientovi meníš najmä tento súbor, obrázky v `src/assets` a prípadne farby v `src/styles.css` alebo `local-preview.html`.

## Predajné featurky v prototype

- rýchly asistent s voľbami Menu, Drive In, Rezervácia a Kontakt,
- rezervačný/dopytový formulár pripravený na napojenie na e-mail alebo booking systém,
- mapa, klikateľný telefón a navigácia,
- menu sekcia so segmentovaným prepínaním,
- galéria pripravená na reálne fotky klienta.
