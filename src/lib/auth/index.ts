import { Preferences } from "@capacitor/preferences";
import { PUBLIC_LOGIN_PASSWORD, PUBLIC_COOKIE_SECRET } from "$env/static/public";
import { browser } from "$app/environment";

const AUTH_KEY = "auth_token";
const TOKEN_EXPIRY_DAYS = 7;

function generateToken(password: string): string {
  const expires = Date.now() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${password}:${expires}:${PUBLIC_COOKIE_SECRET}`;
  // Simple hash using btoa for obfuscation (not cryptographic)
  const token = btoa(payload);
  return `${token}.${expires}`;
}

function validateToken(token: string): boolean {
  try {
    const [encoded, expiry] = token.split(".");
    if (!encoded || !expiry) return false;

    const expires = parseInt(expiry);
    if (Date.now() > expires) return false;

    const decoded = atob(encoded);
    const [password, tokenExpiry, secret] = decoded.split(":");

    return password === PUBLIC_LOGIN_PASSWORD && tokenExpiry === expiry && secret === PUBLIC_COOKIE_SECRET;
  } catch {
    return false;
  }
}

export async function saveAuthToken(password: string): Promise<boolean> {
  if (password !== PUBLIC_LOGIN_PASSWORD) return false;

  const token = generateToken(password);
  await Preferences.set({ key: AUTH_KEY, value: token });
  return true;
}

export async function checkAuthToken(): Promise<boolean> {
  if (!browser) return false;
  const { value } = await Preferences.get({ key: AUTH_KEY });
  if (!value) return false;

  const valid = validateToken(value);
  if (!valid) {
    await Preferences.remove({ key: AUTH_KEY });
  }
  return valid;
}

export async function clearAuthToken(): Promise<void> {
  await Preferences.remove({ key: AUTH_KEY });
}
