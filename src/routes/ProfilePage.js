import { useLoaderData, useOutletContext, Link } from "react-router-dom";
import userInteractions from "../api/user-service";
import ProfileItemList from "../components/ProfileList";

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
        <ProfileItemList list={created} type="created" />
        <ProfileItemList list={favourite} type="favorite" />
      </div>
    </div>
  );
}
