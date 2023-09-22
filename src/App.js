import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {loader as rootLoader, action as rootAction} from "./routes/Root";
import Recipe, {loader as recipeLoader} from "./routes/Recipe";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "recipes/:id",
        element: <Recipe />,
        loader: recipeLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
