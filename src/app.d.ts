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

    interface Bestanddeel {
      naam: string;
      hoeveelheid: string;
      maatstaf: string;
      nota?: string;
    }
  }

  interface ResepStap {
    nommer: number;
    instruksies: { label: string }[];
    bestanddele: DB.Bestanddeel[];
  }

  type ApiResult<T> =
    | {
        success: true;
        data: T;
      }
    | {
        success: false;
        error_message: string;
      };

  type SimpleApiResult =
    | {
        success: true;
      }
    | {
        success: false;
        error_message: string;
      };
}

export {};
