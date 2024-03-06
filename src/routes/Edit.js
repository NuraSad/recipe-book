import { useState, useRef, useEffect } from "react";
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import apis from "../api";
import ItemsList from "../components/ItemsList";

export async function actionEdit({ request, params }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  const ingredientsList = [];
  const instructionsList = [];
  for (let key of Object.keys(payload)) {
    if (key.includes("ingredient")) {
      ingredientsList.push(payload[key]);
    }
    if (key.includes("instruction")) {
      instructionsList.push(payload[key]);
    }
  }
  const submitForm = {
    name: payload.name,
    meal: payload.meal,
    image: payload.image,
    ingredients: ingredientsList,
    instructions: instructionsList,
    author: payload.username,
  };
  await apis.updateRecipeById(params.id, submitForm).then((res) => {
    window.alert(`Recipe updated successfully`);
  });
  return redirect(`/recipes/${params.id}`);
}

export async function actionCreate({ request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  const ingredientsList = [];
  const instructionsList = [];
  for (let key of Object.keys(payload)) {
    if (key.includes("ingredient")) {
      ingredientsList.push(payload[key]);
    }
    if (key.includes("instruction")) {
      instructionsList.push(payload[key]);
    }
  }
  const submitForm = {
    name: payload.name,
    meal: payload.meal,
    image: payload.image,
    ingredients: ingredientsList,
    instructions: instructionsList,
    author: payload.username,
  };
  const newId = await apis.insertRecipe(submitForm).then((res) => {
    window.alert(`New recipe has been added!`);
    return res.data.id;
  });

  return redirect(`/recipes/${newId}`);
}

export default function EditRecipe() {
  const [username] = useOutletContext();
  const recipe = useLoaderData();
  const navigate = useNavigate();
  const [ingredientsList, setIngredientsList] = useState(
    recipe ? recipe.ingredients : []
  );
  const [instructionsList, setInstructionsList] = useState(
    recipe ? recipe.instructions : []
  );
  const refInst = useRef(null);
  const refIngr = useRef(null);

  // Check what this do?
  useEffect(() => {});

  function addIngredient(event) {
    event.preventDefault();
    setIngredientsList([...ingredientsList, refIngr.current.value]);
    refIngr.current.value = null;
  }
  function addInstruction(event) {
    event.preventDefault();
    setInstructionsList([...instructionsList, refInst.current.value]);
    refInst.current.value = null;
  }

  function changeIngredient(event, idx) {
    event.preventDefault();
    ingredientsList[idx] = event.target.value;
    setIngredientsList([...ingredientsList]);
  }

  function changeInstruction(event, idx) {
    event.preventDefault();
    instructionsList[idx] = event.target.value;
    setInstructionsList([...instructionsList]);
  }

  function moveIngredient(originalIdx, direction) {
    if (direction === "Up" && originalIdx === 0) return;
    if (direction === "Down" && originalIdx === ingredientsList.length - 1)
      return;
    const ingredient = ingredientsList[originalIdx];
    if (direction === "Up") {
      ingredientsList.splice(originalIdx, 1);
      ingredientsList.splice(originalIdx - 1, 0, ingredient);
    } else {
      ingredientsList.splice(originalIdx, 1);
      ingredientsList.splice(originalIdx + 1, 0, ingredient);
    }
    setIngredientsList([...ingredientsList]);
  }

  function moveInstruction(originalIdx, direction) {
    if (direction === "Up" && originalIdx === 0) return;
    if (direction === "Down" && originalIdx === instructionsList.length - 1)
      return;
    const instruction = instructionsList[originalIdx];
    if (direction === "Up") {
      instructionsList.splice(originalIdx, 1);
      instructionsList.splice(originalIdx - 1, 0, instruction);
    } else {
      instructionsList.splice(originalIdx, 1);
      instructionsList.splice(originalIdx + 1, 0, instruction);
    }
    setInstructionsList([...instructionsList]);
  }

  function removeIngredient(event, idx) {
    event.preventDefault();
    setIngredientsList(ingredientsList.filter((_, i) => i !== idx));
  }

  function removeInstruction(event, idx) {
    event.preventDefault();
    setInstructionsList(instructionsList.filter((_, i) => i !== idx));
  }

  return (
    <Form method="post" id="recipe-form">
      <label htmlFor="author">
        <span>Author:</span>
        <input
          aria-label="Username"
          type="text"
          name="username"
          defaultValue={username}
          readOnly
        />
      </label>

      <label htmlFor="name">
        <span>Name:</span>
        <input
          placeholder="Name"
          aria-label="Recipe name"
          type="text"
          name="name"
          defaultValue={recipe ? recipe.name : null}
        />
      </label>
      <label htmlFor="meal-select">
        <span>Meal:</span>
        <select
          name="meal"
          id="meal-select"
          defaultValue={recipe ? recipe.meal : null}
        >
          <option value={recipe ? recipe.meal : ""}>
            {recipe ? recipe.meal : "Choose a meal type"}
          </option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      </label>
      <label htmlFor="image-url">
        <span>Image URL:</span>
        <input
          aria-label="Image URL"
          type="text"
          name="image"
          defaultValue={recipe ? recipe.image : null}
        />
      </label>
      <div id="create-items">
        <span>Ingredients:</span>
        <ItemsList
          list={ingredientsList}
          moveItem={moveIngredient}
          onDelete={removeIngredient}
          type={"ingredient"}
          text={refIngr}
          addItem={addIngredient}
          onChange={changeIngredient}
          rows={1}
        />
      </div>
      <div id="create-items">
        <span>Instructions:</span>
        <ItemsList
          list={instructionsList}
          moveItem={moveInstruction}
          onDelete={removeInstruction}
          type={"instruction"}
          text={refInst}
          addItem={addInstruction}
          onChange={changeInstruction}
          rows={3}
        />
      </div>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
