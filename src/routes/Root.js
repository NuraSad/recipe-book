import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import apis from "../api";

export async function loader() {
  return await apis.getAllRecipes().then((recipes) => recipes.data.data);
}

export async function action() {
  return redirect("recipes/create");
}

export default function Root() {
  const recipes = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>Recipe Book</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search recipes"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {recipes.length ? (
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe._id}>
                  <Link to={`recipes/${recipe._id}`}>
                    {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
                    {/* {recipe.favorite && <span>★</span>} */}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No recipes</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
