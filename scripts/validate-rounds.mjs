import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(resolve(root, "rounds.json"), "utf8"));
const seen = new Set();

if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.rounds)) {
  throw new Error("rounds.json no cumple el esquema esperado");
}

for (const [index, round] of manifest.rounds.entries()) {
  const required = ["id", "date", "course", "par", "score", "path"];
  for (const key of required) {
    if (round[key] === undefined || round[key] === "") {
      throw new Error(`Falta ${key} en la vuelta ${index + 1}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}\/$/.test(round.path)) {
    throw new Error(`Ruta no válida: ${round.path}`);
  }
  if (seen.has(round.id)) throw new Error(`ID duplicado: ${round.id}`);
  seen.add(round.id);
  await access(resolve(root, round.path, "index.html"));
}

console.log(`Histórico válido: ${manifest.rounds.length} partida(s).`);
