import { useEffect, useState } from "react";
import { Form, useLoaderData, useOutletContext } from "react-router-dom";
import apis from "../api";

export async function loader({ params }) {
  return await apis.getRecipeById(params.id).then((recipe) => recipe.data.data);
}

export default function Recipe() {
  const checkFavourite = async (id, username) => {
    const response = await apis.checkLikedRecipe(id, username);
    if (response) {
      setFavourite(response.data);
    }
  };

  const recipe = useLoaderData();
  const [username] = useOutletContext();
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    if (recipe && username) {
      checkFavourite(recipe._id, username);
    }
  }, [recipe, username]);

  return (
    <div id="recipe">
      <img key={recipe.image} src={recipe.image || null} alt="dish" />
      <div id="title-field">
        <h1>
          {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
          {username && (
            <Favorite
              favourite={favourite}
              setFavourite={setFavourite}
              username={username}
              recipe={recipe}
            />
          )}
        </h1>
        {recipe.meal && <p>{recipe.meal}</p>}
        <p>
          Created by: <span>{recipe.author}</span>
        </p>
      </div>
      <div id="ingredients-list">
        <p>Ingredients:</p>
        {recipe.ingredients.length && (
          <ul>
            {recipe.ingredients.map((ingredient, i) => {
              return <li key={i}>{ingredient}</li>;
            })}
          </ul>
        )}
      </div>
      <div id="instructions-list">
        <p>Instructions:</p>
        {recipe.instructions.length && (
          <ol>
            {recipe.instructions.map((instruction, i) => {
              return <li key={i}>{instruction}</li>;
            })}
          </ol>
        )}
      </div>
      {recipe.author === username && (
        <div id="buttons-field">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      )}
    </div>
  );
}

function Favorite({ favourite, setFavourite, username, recipe }) {
  async function handleRecipeLike() {
    const response = await apis.addOrRemoveFavouriteRecipe(
      recipe._id,
      username
    );
    if (response.data.success) {
      window.alert(`${response.data.message}`);
      setFavourite((prev) => !prev);
    } else {
      window.alert(`${response.data.message}`);
    }
  }

  return (
    <button type="button" onClick={handleRecipeLike}>
      {favourite ? "♥" : "♡"}
    </button>
  );
}
