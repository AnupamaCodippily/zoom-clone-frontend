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

  console.log(authResult);
}
