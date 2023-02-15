import { setAuthErrorState, setAuthJwtToken } from "../../state/slices/auth";
import { store } from "../../state/store";
import { ADMIN_LOGIN_URL } from "../constants/urls";

export async function authenticateAdmin(username: string, password: string) {
  const basicToken = "Basic " + btoa(username + ":" + password);
  console.log(basicToken);
  const authResult = await fetch(ADMIN_LOGIN_URL, {
    method: "post",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      Authorization: basicToken,
      "Content-type": "application/json",
    },
  });

  const { access_token } = await authResult.json()

  if (access_token) {
    store.dispatch(setAuthJwtToken(access_token))
    store.dispatch(setAuthErrorState(false))
  } else {
    store.dispatch(setAuthErrorState(true))
  }

}
