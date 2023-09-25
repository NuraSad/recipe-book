import { redirect } from "react-router-dom";
import { deleteRecipeById } from "../api";

export async function actionDelete({ params }) {
  await deleteRecipeById(params.id).then(() =>
    window.alert("Recipe has been deleted!")
  );
  return redirect("/");
}
