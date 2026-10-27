import * as env from "$env/static/public";
import { mount, unmount } from "svelte";
import InstallPrompt from "$lib/ui/feature/InstallPrompt.svelte";

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

export const DateUtil = {
  format(date: Date, format: string) {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    const tokens: Record<string, string> = {
      YY: String(date.getFullYear()).slice(-2),
      YYYY: date.getFullYear().toString(),
      M: "" + (date.getMonth() + 1),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      MMM: date.toLocaleDateString("en", { month: "short" }),
      MMMM: date.toLocaleDateString("en", { month: "long" }),
      D: "" + date.getDate(),
      DD: String(date.getDate()).padStart(2, "0"),
      ddd: date.toLocaleDateString("en", { weekday: "short" }),
      dddd: date.toLocaleDateString("en", { weekday: "long" }),
      H: "" + date.getHours(),
      HH: String(date.getHours()).padStart(2, "0"),
      m: "" + date.getMinutes(),
      mm: String(date.getMinutes()).padStart(2, "0"),
      s: "" + date.getSeconds(),
      ss: String(date.getSeconds()).padStart(2, "0"),
    };

    return format.replace(/YYYY|YY|MMMM|MMM|MM|M|dddd|ddd|DD|D|HH|H|mm|m|ss|s/g, (match) => tokens[match]);
  },

  /** Relative time in Afrikaans for a "YYYY-MM-DD HH:mm:ss" string, e.g. "5 minute gelede". */
  timeAgo(date: string, now = new Date()): string {
    const then = new Date(date.replace(" ", "T"));
    if (isNaN(then.getTime())) return "";

    const minutes = Math.floor((now.getTime() - then.getTime()) / 60000);
    if (minutes < 1) return "nou net";
    if (minutes < 60) return `${minutes} ${minutes === 1 ? "minuut" : "minute"} gelede`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} uur gelede`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ${days === 1 ? "dag" : "dae"} gelede`;

    return DateUtil.format(then, "D MMM YYYY");
  },

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  },

  isDateInRange(date: Date, start: Date, end: Date): boolean {
    if (!start || !end) return false;

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const s = new Date(start);
    s.setHours(0, 0, 0, 0);
    const e = new Date(end);
    e.setHours(0, 0, 0, 0);

    return d >= s && d <= e;
  },

  /**
   * Returns a Date object representing the start or end of the day based on the provided date string.
   * @param {string | null} date Date in the format "YYYY-MM-DD HH:mm"
   * @param {'end' | 'start'} type
   * @return {Date | null} Returns a Date object representing the start or end of the day.
   */
  parseWithTimeBoundary(date: string | null, type: "end" | "start" = "start"): Date | null {
    if (!date) return null;

    const [day, time] = date.split(" ");

    return new Date(`${day} ${time || type === "start" ? "00:00" : "23:59"}`);
  },
};

// Photos are stored as data urls inside the recipe document, and Firestore caps a document at 1MB.
const MAX_IMAGE_BYTES = 700_000;

const INSTALL_DISMISSED_KEY = "install_prompt_dismissed_at";
const INSTALL_DISMISS_DAYS = 30;
const INSTALL_SHOW_DELAY_MS = 3000;

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

export function ok<T = void>(value?: T): Result<T> {
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

/**
 * Shrinks an image so its longest side is at most `max_size` pixels (never enlarging it) and encodes it as
 * WebP, or JPEG where the browser cannot encode WebP. Returns a data url.
 */
export async function compressImage(file: File, max_size = 1200, quality = 0.8): Promise<string> {
  // "from-image" applies the EXIF rotation, so phone photos stay upright.
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, max_size / Math.max(bitmap.width, bitmap.height));

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  let data_url = encodeImage(canvas, quality);
  if (data_url.length > MAX_IMAGE_BYTES) data_url = encodeImage(canvas, 0.6);
  return data_url;
}

function encodeImage(canvas: HTMLCanvasElement, quality: number) {
  const webp = canvas.toDataURL("image/webp", quality);
  // Browsers that cannot encode WebP silently fall back to PNG, which is far bigger than JPEG.
  return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", quality);
}

/**
 * Invites visitors to install the site as an app, with a banner mounted on the body a few seconds after
 * load. Not shown inside the installed app, or for 30 days after the visitor dismisses it. Returns a cleanup.
 */
export function setupInstallPrompt() {
  const is_installed =
    matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true;
  if (is_installed || wasInstallDismissedRecently()) return () => {};

  // iOS Safari has no install event; there the visitor adds the site from the share menu themselves.
  const is_ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  let install_event: BeforeInstallPromptEvent | null = window.install_prompt_event ?? null;
  let banner: ReturnType<typeof mount> | null = null;
  let ready = false;
  let closed = false;

  const timer = setTimeout(() => {
    ready = true;
    show();
  }, INSTALL_SHOW_DELAY_MS);
  window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  window.addEventListener("appinstalled", close);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.removeEventListener("appinstalled", close);
    if (banner) unmount(banner);
  };

  // Chrome can send its install event before or after the delay, so this is called on both.
  function show() {
    if (banner || closed || !ready || (!is_ios && !install_event)) return;
    banner = mount(InstallPrompt, {
      target: document.body,
      props: { is_ios, oninstall: install_event ? install : undefined, ondismiss: dismiss },
    });
  }

  function close() {
    closed = true;
    if (banner) unmount(banner);
    banner = null;
  }

  function dismiss() {
    close();
    try {
      localStorage.setItem(INSTALL_DISMISSED_KEY, String(Date.now()));
    } catch {
      // Storage can be unavailable (private mode); the banner then simply returns next visit.
    }
  }

  async function install() {
    if (!install_event) return;
    await install_event.prompt();
    const { outcome } = await install_event.userChoice;
    // The event can only be used once.
    install_event = null;
    window.install_prompt_event = undefined;
    if (outcome === "dismissed") dismiss();
    else close();
  }

  function onBeforeInstallPrompt(event: Event) {
    // Stops Chrome's own mini-infobar, so the prompt only opens from our button.
    event.preventDefault();
    install_event = event as BeforeInstallPromptEvent;
    show();
  }
}

function wasInstallDismissedRecently() {
  try {
    const dismissed_at = Number(localStorage.getItem(INSTALL_DISMISSED_KEY));
    return dismissed_at > 0 && Date.now() - dismissed_at < INSTALL_DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}
