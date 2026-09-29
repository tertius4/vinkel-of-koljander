export async function load({ url }) {
  const search = url.searchParams.get("search") || "";
  const categories = url.searchParams.getAll("categories");
  return { search, categories };
}
