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
      rating?: { thumbs_up: number };
      /** Legacy single credit; new recipes use `erkenning`. */
      author?: { naam: string; initials: string };
      /** Up to two credits, e.g. "Kom uit Kookboek A" + "'n Geskenk van Oom Isak". */
      erkenning?: Credit[];
      published?: boolean;
    }

    type CreditKind = "kom uit" | "geleer by" | "geskenk van" | "kom van" | "aangepas deur";

    interface Credit {
      soort: CreditKind;
      naam: string;
    }

    type Reaction = "thumbsup";

    interface Comment {
      id: string;
      recipe_id: string;
      author_name: string;
      content: string;
      reactions: Reaction[];
      created_at: string;
    }

    interface Ingredient {
      ingredient: string;
      amount: number;
      unit: string;
      comment?: string;
    }
  }

  interface RecipeCardData {
    id: string;
    cover_image?: { src: string; alt: string };
    tags: string[];
    title: string;
    tyd?: { werk: number; wag: number };
    published: boolean;
  }

  interface ResepStap {
    nommer: number;
    title?: string;
    description?: string;
    instruksies: { label: string; note?: string }[];
    ingredients: DB.Ingredient[];
  }

  // Chrome-only event, so TypeScript does not know it.
  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }

  interface Window {
    /** Caught by the script in app.html, because Chrome often sends it before the app has loaded. */
    install_prompt_event?: BeforeInstallPromptEvent;
  }

  type Result<T = void> = T extends void
    ? { ok: true }
    : { ok: true; value: T } | { ok: false; status: number; error: string };
  type AsyncResult<T = void> = Promise<Result<T>>;
}

export {};
