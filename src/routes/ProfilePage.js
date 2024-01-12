import { useLoaderData, useOutletContext } from "react-router-dom";
// import apis from "../api";

// export async function loader({ params }) {
//   return await apis.getRecipeById(params.id).then((recipe) => recipe.data.data);
// }

export default function Profile() {
  //   const recipe = useLoaderData();
  const [username, setUsername] = useOutletContext();

  return (
    <div id="profile field">
      <h1>{username}</h1>
      <ul>Your recipes:</ul>
      <li>Beshparmak</li>
    </div>
  );
}
