// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  namespace DB {
    interface Resep {
      id: string;
      naam: string;
      foto: string;
      beskrywing: string;
      kategorieë: string[];
      tyd: { werk: number; wag: number };
      porsies: number;
      stappe: ResepStap[];
    }

    interface Kommentaar {
      id: string;
      resep_id: string;
      gebruiker: string;
      datum: string;
      inhoud: string;
    }

    interface Ingredient {
      ingredient: string;
      amount: number;
      unit: string;
      comment?: string;
    }
  }

  interface ResepStap {
    nommer: number;
    instruksies: { label: string; note?: string }[];
    ingredients: DB.Ingredient[];
  }

  type Result<T = void> = T extends void
    ? { ok: true } | { ok: false; error: string }
    : { ok: true; value: T } | { ok: false; error: string };
  type AsyncResult<T = void> = Promise<Result<T>>;
}

export {};
