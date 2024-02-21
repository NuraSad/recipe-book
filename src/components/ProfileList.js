import { Link } from "react-router-dom";

function ProfileItemList({ list, type }) {
  return (
    <div className="profile-column">
      <span>Your {type} recipes:</span>
      {list.length ? (
        <ul>
          {list.map((recipe) => (
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
          <i>You don't have any {type} recipes =( </i>
        </p>
      )}
    </div>
  );
}

export default ProfileItemList;
