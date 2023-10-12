import { useState, useRef, useEffect } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import apis from "../api";
import { Fragment } from "react";

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
        <ItemsList
          list={ingredientsList}
          onDelete={removeIngredient}
          type={"ingredient"}
          text={refIngr}
          addItem={addIngredient}
          onChange={changeIngredient}
          rows={1}
        />
      </label>
      <label id="create-items">
        <span>Instructions</span>
        <ItemsList
          list={instructionsList}
          onDelete={removeInstruction}
          type={"instruction"}
          text={refInst}
          addItem={addInstruction}
          onChange={changeInstruction}
          rows={3}
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

function ItemsList({ list, onDelete, type, text, addItem, onChange, rows }) {
  return (
    <>
      {list.length
        ? list.map((item, i) => {
            return (
              <Fragment key={i}>
                <Item
                  item={item}
                  onDelete={onDelete}
                  index={i}
                  onChange={onChange}
                  type={type}
                  rows={rows}
                />
              </Fragment>
            );
          })
        : null}
      <textarea ref={text} rows={rows} />
      <button onClick={(event) => addItem(event)}>{`Add ${type}`}</button>
    </>
  );
}

function Item({ item, onDelete, index, onChange, type, rows }) {
  const [isEditing, setIsEditing] = useState(false);
  let itemContent;
  if (isEditing) {
    itemContent = (
      <>
        <textarea
          value={item}
          rows={rows}
          onChange={(e) => {
            onChange(e, index);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(false);
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    itemContent = (
      <>
        <textarea
          name={`${type}${index}`}
          type="text"
          value={item}
          rows={rows}
          readOnly
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <>
      {itemContent}
      <button id="remove-button" onClick={(e) => onDelete(e, index)}>
        Remove
      </button>
    </>
  );
}
