import * as env from "$env/static/public";

export const WYSIG_WAGWOORD = env.PUBLIC_LOGIN_PASSWORD;
export const DB_NAME = env.PUBLIC_DB_NAME;
export const APP_NAME = env.PUBLIC_APP_NAME;
export const FIREBASE_CONFIG = {
  apiKey: env.PUBLIC_API_KEY,
  authDomain: env.PUBLIC_AUTH_DOMAIN,
  projectId: env.PUBLIC_PROJECT_ID,
  storageBucket: env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_MESSAGING_SENDER_ID,
  appId: env.PUBLIC_APP_ID,
};

export const FOOD_CATEGORIES = [
  // Time of day
  { label: "Ontbyt" },
  { label: "Middagete" },
  { label: "Aandete" },
  { label: "Enigetyd" },
  { label: "Brunch" },

  // Temperature
  { label: "Koud" },
  { label: "Warm" },

  // Metodes
  { label: "Oondgebak" },
  { label: "Panbraai" },
  { label: "Stoofpot" },
  { label: "Braai" },
  { label: "Instant-pot" },
  { label: "Stapperskos" },
  { label: "Gebottel" },

  // Cooking time
  { label: "Stadig gaar" },
  { label: "Vinnig" },

  // Difficulty
  { label: "Eenvoudig" },

  // Flavours
  { label: "Brand" },
  { label: "Sout" },
  { label: "Soet" },
  { label: "Bitter" },

  // Dietary preferences
  { label: "Glutenvry" },
  { label: "Suikervry" },
  { label: "Laktosevry" },
  { label: "Vegan" },
  { label: "Vegetaries" },

  // Course types
  { label: "Hoofdis" },
  { label: "Bykos" },
  { label: "Nagereg" },
  { label: "Sop" },
  { label: "Slaai" },
  { label: "Versnappering" },
  { label: "Drankie" },
  { label: "Alkoholies" },

  // Origin / Cuisine
  { label: "Plaaslik" },
  { label: "Tradisioneel" },
  { label: "Afrika" },
  { label: "Asiaties" },
  { label: "Europees" },
  { label: "Amerikaans" },
  { label: "Mediterreens" },
];

export function normalise(text: string) {
  if (typeof text !== "string") return "";

  return text.toLowerCase().trim().replace(/\s+/g, "_");
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
}

export function ok<T>(value: T): Result<T> {
  return { ok: true, value } as Result<T>;
}

export function err<T = void>(status: number, error: string): Result<T>;
export function err<T = void>(error: string): Result<T>;
export function err<T = void>(statusOrError: number | string, error?: string): Result<T> {
  if (typeof statusOrError === "number") {
    return {
      ok: false,
      status: statusOrError,
      error: error!,
    } as Result<T>;
  }

  return {
    ok: false,
    status: 500,
    error: statusOrError,
  } as Result<T>;
}

export function searchOnText<T>(items: T[], getSearchStrings: (item: T) => string[], query: string): T[] {
  const q = normalise(query);
  if (!q) return items;

  return items
    .map((item, index) => {
      const strings = getSearchStrings(item).map((value) => value.toLowerCase().trim());

      const score = Math.max(
        ...strings.map((value) => {
          let score = 0;

          if (value === q) {
            score += 1000;
          }

          if (value.startsWith(q)) {
            score += 500;
          }

          if (value.split(/\s+/).some((word) => word.startsWith(q))) {
            score += 300;
          }

          if (value.includes(q)) {
            score += 100;
          }

          // Prefer shorter matches
          score -= value.length * 0.1;

          return score;
        }),
      );

      return { item, score, index };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((result) => result.item);
}
