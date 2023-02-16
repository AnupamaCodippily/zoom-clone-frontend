import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { authenticateAdmin } from "../../lib/authentication/authenticate-admin";

const LoginView = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  async function attemptAdminSignIn(e: FormEvent) {
    e.preventDefault()
    const res: Response | null = await authenticateAdmin(adminUsername, adminPassword);
    setUserLoggedIn(res != null);
  }

  if (userLoggedIn) return <Navigate to='/classrooms/1' />
  return (
    <div>
      <div>
        <h1>Sign in as Admin</h1>
        <form onSubmit={(e: FormEvent) => attemptAdminSignIn(e)}>
          <input
            required
            type="text"
            value={adminUsername}
            placeholder="Admin username"
            autoComplete=""
            onChange={(e) => setAdminUsername(e.target.value)}
          />
          <input
            required
            type="password"
            value={adminPassword}
            placeholder="Admin password"
            autoComplete="current-password"
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <input type="submit" value="Sign in" />
        </form>
      </div>
      <div>
        <h1>Sign in Student</h1>
        {/* <form>
          <input type="text" value="" />
          <input type="password" value="" />
          <input type="submit" value="Sign in" />
        </form> */}
      </div>
    </div>
  );
};

export default LoginView;
