# ANB Golf · Histórico de partidas

Web estática publicada con GitHub Pages para conservar las partidas de Aníbal.

## Estructura

- `/index.html`: portada general; carga y ordena automáticamente `rounds.json`.
- `/rounds.json`: índice histórico y estadísticas básicas de todas las vueltas.
- `/AAAA-MM-DD/index.html`: informe interactivo completo de cada partida.

## Añadir una partida

1. Crear la carpeta de la fecha con su `index.html` interactivo.
2. Añadir una entrada al principio de `rounds.json`.
3. Ejecutar `node scripts/validate-rounds.mjs`.
4. Publicar ambos cambios en `main`; GitHub Pages actualiza la web.

La portada no contiene resultados escritos a mano: se reconstruye desde
`rounds.json`, por lo que cada nueva entrada aparece automáticamente.
