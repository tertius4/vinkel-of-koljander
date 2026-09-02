export async function load({ url }) {
  return {
    search: url.searchParams.get("search") || "",
  };
}
