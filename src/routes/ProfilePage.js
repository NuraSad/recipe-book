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
    <div className="profile-field">
      <h1>{username}'s profile</h1>
      <div className="table-field">
        <div className="profile-column">
          <span>Your created recipes:</span>
          {created.length ? (
            <ul>
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
              <i>You didn't create any recipes =( </i>
            </p>
          )}
        </div>
        <div className="profile-column">
          <span>Your favorite recipes:</span>
          {favourite.length ? (
            <ul>
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
              <i>You didn't like any recipes.</i>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
