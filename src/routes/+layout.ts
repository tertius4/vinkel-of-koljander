import { browser } from "$app/environment";
import { env } from "$env/dynamic/public";
import { FIREBASE_CONFIG, APP_NAME } from "$lib";
import { checkAuthToken } from "$lib/auth";
import { initializeApp } from "firebase/app";

export async function load({ depends }) {
  depends("layout:root");
  initializeApp(FIREBASE_CONFIG, APP_NAME);

  const is_logged_in = browser && (await checkAuthToken());
  const is_maintenance_mode = env.PUBLIC_MAINTENANCE_MODE === "true";
  return { is_logged_in, is_maintenance_mode };
}
