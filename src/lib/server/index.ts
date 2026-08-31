import { query } from "$app/server";
import type { RemoteQueryFunction } from "@sveltejs/kit";

type RemoteFunction = (...args: any[]) => AsyncResult<any>;
export function remote<T extends RemoteFunction>(fn: T): RemoteQueryFunction<Parameters<T>[0], ReturnType<T>> {
  return query("unchecked", fn) as RemoteQueryFunction<Parameters<T>[0], ReturnType<T>>;
}
