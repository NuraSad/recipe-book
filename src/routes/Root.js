import {
  Outlet,
  NavLink,
  useLoaderData,
  useNavigation,
  useSubmit,
  Form,
  redirect,
} from "react-router-dom";
import apis from "../api";
import { useState, useEffect } from "react";
import Login from "./LoginPage";
import Register from "./RegisterPage";

export async function loader({ request }) {
  const recipes = await apis
    .getAllRecipes()
    .then((recipes) => recipes.data.data);
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (q == null) {
    return { recipes, q };
  } else {
    return { recipes: recipes.filter((recipe) => recipe.name.includes(q)), q };
  }
}

export async function action() {
  return redirect("recipes/create");
}

export default function Root() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showRegister, setShowRegister] = useState(true);
  const recipes = useLoaderData().recipes;
  const q = useLoaderData().q;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  function handleSignInClick(e) {
    e.preventDefault();
    setShowSignIn((prev) => !prev);
  }

  function handleRegisterClick(e) {
    e.preventDefault();
    setShowRegister((prev) => !prev);
  }

  function handleLoginButton() {
    setShowSignIn((prev) => !prev);
  }

  function handleRegisterButton() {
    setShowRegister((prev) => !prev);
  }

  return (
    <>
      <div id="sidebar">
        <div id="auth-field">
          <button id="sign-in-button" onClick={(e) => handleSignInClick(e)}>
            Sign In
          </button>
          <button id="register-button" onClick={(e) => handleRegisterClick(e)}>
            Register
          </button>
        </div>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search recipes"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
        </div>
        <nav>
          {recipes.length ? (
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe._id}>
                  <NavLink
                    to={`recipes/${recipe._id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
                    {/* {recipe.favorite && <span>★</span>} */}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No recipes</i>
            </p>
          )}
          <Form method="post">
            <button type="submit" id="new-recipe-button">
              Add new recipe
            </button>
          </Form>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
        <Login isShowing={showSignIn} handleLoginButton={handleLoginButton} />
        <Register
          isShowing={showRegister}
          handleRegisterButton={handleRegisterButton}
        />
      </div>
    </>
  );
}
