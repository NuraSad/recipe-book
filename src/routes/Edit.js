import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import apis from "../api";

export async function actionEdit({ request, params }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  payload.ingredients = [{ ingredient: payload.ingredients }];
  payload.instructions = [{ step: payload.instructions }];
  await apis.updateRecipeById(params.id, payload).then((res) => {
    window.alert(`Recipe updated successfully`);
  });
  return redirect(`/recipes/${params.id}`);
}

export async function actionCreate({ request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  payload.ingredients = [{ ingredient: payload.ingredients }];
  payload.instructions = [{ step: payload.instructions }];
  const newId = await apis.insertRecipe(payload).then((res) => {
    window.alert(`New recipe has been added!`);
    return res.data.id;
  });
  return redirect(`/recipes/${newId}`);
}

export default function EditRecipe() {
  const recipe = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="recipe-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="Recipe name"
          type="text"
          name="name"
          defaultValue={recipe ? recipe.name : null}
        />
      </p>
      <label>
        <span>Meal</span>
        <input
          type="text"
          name="meal"
          placeholder="Breakfast"
          defaultValue={recipe ? recipe.meal : null}
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
        <span>Ingredients</span>
        <textarea
          name="ingredients"
          placeholder="1 onion"
          defaultValue={recipe ? recipe.ingredients[0].ingredient : null}
          rows={6}
        />
      </label>
      <label>
        <span>Instructions</span>
        <textarea
          name="instructions"
          placeholder="Dice onion..."
          defaultValue={recipe ? recipe.instructions[0].step : null}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
