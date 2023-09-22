import { Form, useLoaderData } from "react-router-dom";

export default function EditRecipe() {
  const { recipe } = useLoaderData();

  return (
    <Form method="post" id="recipe-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="Recipe name"
          type="text"
          name="name"
          defaultValue={recipe.name}
        />
      </p>
      <label>
        <span>Meal</span>
        <input
          type="text"
          name="meal"
          placeholder="Breakfast"
          defaultValue={recipe.meal}
        />
      </label>
      {/* <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={recipe.avatar}
        />
      </label> */}
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={recipe.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
