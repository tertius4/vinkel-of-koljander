import { browser } from "$app/environment";
import { replaceState } from "$app/navigation";
import { page } from "$app/state";

const VIEW_CHART = {
  "?recipe_id=": "recipe",
  "/?skep=eD3jwnf64nd3iown": "create_recipe",
  "/": "list",
};

class NavigationClass {
  is_initialized: boolean = $state(false);

  current_page: string = $state("/");
  readonly current_view: string = $derived(this.getCurrentView(this.current_page));

  history: string[] = [];

  initialize() {
    const initial_page = page.url.pathname + page.url.search;
    this.current_page = initial_page;
    this.is_initialized = true;
  }

  navigateTo(page: string) {
    if (page === this.current_page) return;

    this.current_page = page;
    replaceState(this.current_page, {});
    this.history.push(this.current_page);

    if (page === "/") this.history = [];
  }

  back() {
    this.current_page = this.history.pop() || "/";
  }

  private getCurrentView(current_page: string) {
    for (const [identifier, name] of Object.entries(VIEW_CHART)) {
      if (current_page.includes(identifier)) {
        return name;
      }
    }
    return "list";
  }
}

export const Navigation = new NavigationClass();
