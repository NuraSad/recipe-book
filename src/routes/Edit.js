import { useState, useRef, useEffect, useCallback } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import apis from "../api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
  };
  const newId = await apis.insertRecipe(submitForm).then((res) => {
    window.alert(`New recipe has been added!`);
    return res.data.id;
  });

  return redirect(`/recipes/${newId}`);
}

export default function EditRecipe() {
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
  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    const dragItem = ingredientsList[dragIndex];

    if (dragItem) {
      setIngredientsList((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  }, []);

  function moveInstruction(dragIndex, hoverIndex) {
    const dragItem = instructionsList[dragIndex];

    if (dragItem) {
      setInstructionsList((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
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
      <label htmlFor="meal-select">
        <span>Meal</span>
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
        <span>Image URL</span>
        <input
          aria-label="Image URL"
          type="text"
          name="image"
          defaultValue={recipe ? recipe.image : null}
        />
      </label>
      <label id="create-items">
        <span>Ingredients</span>
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
      </label>
      <label id="create-items">
        <span>Instructions</span>
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
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
