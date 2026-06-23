// German UI strings. Single map keeps the card lightweight; the API and site
// are German, so we localize to DE only.

const STRINGS: Record<string, string> = {
  beste_zeit_heute: "Beste Zeit heute",
  pai: "PAI",
  aktualisiert: "Aktualisiert",
  laden: "Lade Aaredaten …",
  ladefehler: "Aaredaten konnten nicht geladen werden.",
  erneut_versuchen: "Erneut versuchen",
};

export function t(key: string): string {
  return STRINGS[key] ?? key;
}
