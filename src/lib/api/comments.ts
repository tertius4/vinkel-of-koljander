import { DateUtil, err, ok } from "$lib";
import { DB } from "$lib/DB";
import { initialsOf } from "$lib/recipe";

const MAX_NAME_LENGTH = 40;
const MAX_TEXT_LENGTH = 500;

export interface CommentView {
  id: string;
  name: string;
  initials: string;
  when: string;
  text: string;
  thumbs_up: boolean;
}

export interface CommentsSummary {
  comments: number;
  thumbs_up: number;
}

export interface NewComment {
  name: string;
  text: string;
  thumbs_up: boolean;
}

function toView(comment: DB.Comment): CommentView {
  return {
    id: comment.id,
    name: comment.author_name,
    initials: initialsOf(comment.author_name),
    when: DateUtil.timeAgo(comment.created_at),
    text: comment.content,
    thumbs_up: comment.reactions.includes("thumbsup"),
  };
}

export async function getComments(
  recipe_id: string,
): AsyncResult<{ comments: CommentView[]; summary: CommentsSummary }> {
  try {
    const all = await DB.Comments.getAll({
      filters: [{ field: "recipe_id", operator: "==", value: recipe_id }],
    });

    // Newest first. Sorted here so Firestore does not need a composite index.
    all.sort((a, b) => b.created_at.localeCompare(a.created_at));
    const comments = all.map((comment) => ({ ...comment, reactions: comment.reactions ?? [] })).map(toView);

    return ok({
      comments,
      summary: {
        comments: comments.length,
        thumbs_up: comments.filter((comment) => comment.thumbs_up).length,
      },
    });
  } catch (error) {
    console.error("Failed to load comments:", error);
    return err(500, "Kon nie kommentaar laai nie");
  }
}

export async function addComment(recipe_id: string, input: NewComment): AsyncResult<CommentView> {
  const name = input.name.trim();
  const text = input.text.trim();

  if (!name) return err(400, "Vul asseblief jou naam in");
  if (name.length > MAX_NAME_LENGTH) return err(400, `Naam mag nie langer as ${MAX_NAME_LENGTH} karakters wees nie`);
  if (text.length > MAX_TEXT_LENGTH)
    return err(400, `Kommentaar mag nie langer as ${MAX_TEXT_LENGTH} karakters wees nie`);
  if (!text && !input.thumbs_up) return err(400, "Skryf iets of gee 'n duimpie");

  const data: Omit<DB.Comment, "id" | "created_at"> = {
    recipe_id,
    author_name: name,
    content: text,
    reactions: input.thumbs_up ? ["thumbsup"] : [],
  };

  const result = await DB.Comments.create(data);
  if (!result.ok) return err(500, "Kon nie kommentaar stoor nie");

  return ok(toView({ ...data, id: result.id, created_at: DateUtil.format(new Date(), "YYYY-MM-DD HH:mm:ss") }));
}
