import { Form, useLoaderData, useOutletContext } from "react-router-dom";
import apis from "../api";

export async function loader({ params }) {
  return await apis.getRecipeById(params.id).then((recipe) => recipe.data.data);
}

export default function Recipe() {
  const recipe = useLoaderData();
  const [username] = useOutletContext();

  return (
    <div id="recipe">
      <img key={recipe.image} src={recipe.image || null} alt="dish" />
      <div id="title-field">
        <h1>
          {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
          {/* <Favorite recipe={recipe} /> */}
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

// function Favorite({ recipe }) {
//   // yes, this is a `let` for later
//   let favorite = recipe.favorite;
//   return (
//     <Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
