import { useState, useRef, useEffect } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import apis from "../api";
import { Fragment } from "react";

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
  console.log(payload);
  // payload.ingredients = [{ ingredient: payload.ingredients }];
  // payload.instructions = [{ step: payload.instructions }];
  // const newId = await apis.insertRecipe(payload).then((res) => {
  //   window.alert(`New recipe has been added!`);
  //   return res.data.id;
  // });
  return redirect(`/recipes/create`);
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
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
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
      <label id="create-items">
        <span>Ingredients</span>
        <ItemsList
          list={ingredientsList}
          onDelete={removeIngredient}
          type={"ingredient"}
          text={refIngr}
          addItem={addIngredient}
          onChange={changeIngredient}
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

function ItemsList({ list, onDelete, type, text, addItem, onChange }) {
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
                />
              </Fragment>
            );
          })
        : null}
      <textarea ref={text} />
      <button onClick={(event) => addItem(event)}>{`Add ${type}`}</button>
    </>
  );
}

function Item({ item, onDelete, index, onChange, type }) {
  const [isEditing, setIsEditing] = useState(false);
  let itemContent;
  if (isEditing) {
    itemContent = (
      <>
        <input
          value={item}
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
        <input name={`${type}${index}`} type="text" value={item} readOnly />
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
      <button onClick={(e) => onDelete(e, index)}>Remove</button>
    </>
  );
}
