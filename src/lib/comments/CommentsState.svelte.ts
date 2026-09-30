import { mount, unmount } from "svelte";
import { addComment, getComments, type CommentView, type CommentsSummary } from "$lib/api/comments";

import ModalComment from "./ModalComment.svelte";

const NAME_STORAGE_KEY = "comment_name";

export interface CommentForm {
  name: string;
  text: string;
  thumbs_up: boolean;
  saving: boolean;
  error: string;
}

export class CommentsState {
  items: CommentView[] = $state([]);
  summary: CommentsSummary = $state({ comments: 0, thumbs_up: 0 });
  loading = $state(true);
  load_error = $state("");

  form: CommentForm = $state({ name: "", text: "", thumbs_up: false, saving: false, error: "" });
  private modal: ReturnType<typeof mount> | null = null;

  private readonly recipe_id: string;

  constructor(recipe_id: string) {
    this.recipe_id = recipe_id;
  }

  async load() {
    this.loading = true;
    this.load_error = "";

    const result = await getComments(this.recipe_id);
    if (result.ok) {
      this.items = result.value.comments;
      this.summary = result.value.summary;
    } else {
      this.load_error = result.error;
    }

    this.loading = false;
  }

  openForm() {
    if (this.modal) return;

    this.form.name = this.form.name || this.readStoredName();
    this.form.error = "";
    this.modal = mount(ModalComment, {
      target: document.body,
      props: {
        data: this.form,
        onclose: () => this.closeForm(),
        onsubmit: () => this.submit(),
      },
    });
  }

  closeForm() {
    if (!this.modal) return;

    unmount(this.modal);
    this.modal = null;
  }

  async submit() {
    if (this.form.saving) return;

    this.form.saving = true;
    this.form.error = "";

    const result = await addComment(this.recipe_id, {
      name: this.form.name,
      text: this.form.text,
      thumbs_up: this.form.thumbs_up,
    });

    if (!result.ok) {
      this.form.error = result.error;
      this.form.saving = false;
      return;
    }

    this.items = [result.value, ...this.items];
    this.summary = {
      comments: this.summary.comments + 1,
      thumbs_up: this.summary.thumbs_up + (result.value.thumbs_up ? 1 : 0),
    };
    this.storeName(this.form.name.trim());
    this.form.text = "";
    this.form.thumbs_up = false;
    this.form.saving = false;
    this.closeForm();
  }

  private readStoredName() {
    try {
      return localStorage.getItem(NAME_STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  }

  private storeName(name: string) {
    try {
      localStorage.setItem(NAME_STORAGE_KEY, name);
    } catch {
      // Storage can be unavailable (private mode); remembering the name is optional.
    }
  }
}
