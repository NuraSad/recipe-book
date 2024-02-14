import { useLoaderData, useOutletContext, Link } from "react-router-dom";
import userInteractions from "../api/user-service";

export async function loader({ params }) {
  return await userInteractions
    .getUserProfile(params.username)
    .then((profile) => profile.data.data);
}

export default function Profile() {
  const { created, favourite } = useLoaderData();
  const [username] = useOutletContext();

  return (
    <div id="profile field">
      <h1>{username}</h1>
      {created.length ? (
        <ul>
          <span>Your created recipes:</span>
          {created.map((recipe) => (
            <li key={recipe._id}>
              {/* Link to without goes to the relative path, whereas with / find route relative to root path /  */}
              <Link to={`/recipes/${recipe._id}`}>
                {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No recipes</i>
        </p>
      )}
      {favourite.length ? (
        <ul>
          <span>Your liked recipes:</span>
          {favourite.map((recipe) => (
            <li key={recipe._id}>
              {/* Link to without goes to the relative path, whereas with / find route relative to root path /  */}
              <Link to={`/recipes/${recipe._id}`}>
                {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}{" "}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No recipes</i>
        </p>
      )}
    </div>
  );
}
