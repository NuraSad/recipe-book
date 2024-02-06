import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from "./routes/StartPage";
import Root, {loader as rootLoader, action as rootAction} from "./routes/Root";
import Recipe, {loader as recipeLoader} from "./routes/Recipe";
import EditRecipe, {actionEdit, actionCreate}  from "./routes/Edit";
import {actionDelete} from "./routes/Delete";
import ErrorPage from "./components/ErrorPage";
import Profile, {loader as profileLoader} from "./routes/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {index: true, element: <StartPage />},
      {
        path: "recipes/:id",
        element: <Recipe />,
        loader: recipeLoader,
      },
      {
        path: "recipes/:id/edit",
        element: <EditRecipe />,
        loader: recipeLoader,
        action: actionEdit,
      },
      {
        path: "recipes/:id/delete",
        action: actionDelete,
      },
      {
        path: "recipes/create",
        element: <EditRecipe/>,
        action: actionCreate,
      },
      {
        path: "profile/:username",
        element: <Profile/>,
        loader: profileLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
