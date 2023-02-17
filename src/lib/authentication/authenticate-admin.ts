import { setAuthErrorState, setAuthJwtToken, setUserType } from "../../state/slices/auth";
import { setUsername } from "../../state/slices/room";
import { store } from "../../state/store";
import { ADMIN_LOGIN_URL } from "../constants/urls";
import { UserType } from "../constants/user-types";

export async function authenticateAdmin(username: string, password: string) {
  const basicToken = createBasicToken(username, password);
  
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
    store.dispatch(setUsername(username))
    store.dispatch(setUserType(UserType.ADMIN))

    localStorage.setItem('admin-access-token', access_token)

    return true;
  } else {
    store.dispatch(setAuthErrorState(true))
    return false;
  }

}




export function createBasicToken (username: string, password: string) {
  return "Basic " + btoa(username + ":" + password);
}
