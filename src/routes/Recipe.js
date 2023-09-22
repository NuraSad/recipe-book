import { Form, useLoaderData } from "react-router-dom";
import apis from "../api";

export async function loader({ params }) {
  return await apis.getRecipeById(params.id).then((recipe) => recipe.data.data);
}

export default function Recipe() {
  const recipe = useLoaderData();

  return (
    <div id="recipe">
      {/* maybe image later */}
      {/* <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div> */}

      <div>
        <h1>
          {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
          {/* <Favorite recipe={recipe} /> */}
        </h1>

        {recipe.meal && <p>{recipe.meal}</p>}
        <p>Ingredients:</p>
        {recipe.ingredients.length && (
          <ul>
            {recipe.ingredients.map((ingredient, i) => {
              return <li key={i}>{ingredient.ingredient}</li>;
            })}
          </ul>
        )}
        <p>Instructions:</p>
        {recipe.instructions.length && (
          <ol>
            {recipe.instructions.map((instruction, i) => {
              return <li key={i}>{instruction.step}</li>;
            })}
          </ol>
        )}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
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
      </div>
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
