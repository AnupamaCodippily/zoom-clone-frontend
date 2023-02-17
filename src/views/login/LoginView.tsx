import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { authenticateAdmin } from "../../lib/authentication/authenticate-admin";

const LoginView = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  async function attemptAdminSignIn(e: FormEvent) {
    e.preventDefault();
    const res: boolean | null = await authenticateAdmin(
      adminUsername,
      adminPassword
    );
    setUserLoggedIn(res);
  }

  async function attemptStudentSignIn(e: FormEvent) {
    e.preventDefault();
    const res: boolean | null = await authenticateAdmin(
      adminUsername,
      adminPassword
    );

    setUserLoggedIn(res);
  }

  const [isLoggingInAsAdmin, setIsLoggingInAsAdmin] = useState(false);

  if (userLoggedIn) return <Navigate to="/classrooms/1" />;
  return (
    <div className="login-view">
      <div className="login-view-inner-content-panel">
        <div className="form-container">
          <div className="toggle-user-type-container">
            <h3>Sign in</h3>
            <button
              className={
                "student-login-select " +
                (isLoggingInAsAdmin ? "" : "selected-user-type")
              }
              onClick={() => setIsLoggingInAsAdmin(false)}
            >
              Student
            </button>
            <button
              className={
                "admin-login-select " +
                (isLoggingInAsAdmin ? "selected-user-type" : "")
              }
              onClick={() => setIsLoggingInAsAdmin(true)}
            >
              Admin
            </button>
          </div>
          <div>
            {isLoggingInAsAdmin && (
              <form
                onSubmit={(e: FormEvent) => attemptAdminSignIn(e)}
                className="admin-login-form"
              >
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
            )}

            {!isLoggingInAsAdmin && (
              <form
                onSubmit={(e: FormEvent) => attemptStudentSignIn(e)}
                className="admin-login-form"
              >
                <input
                  required
                  type="text"
                  value={studentUsername}
                  placeholder="Student username"
                  autoComplete=""
                  onChange={(e) => setStudentUsername(e.target.value)}
                />
                <input
                  required
                  type="password"
                  value={studentPassword}
                  placeholder="Student password"
                  autoComplete="current-password"
                  onChange={(e) => setStudentPassword(e.target.value)}
                />
                <input type="submit" value="Sign in" />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
