import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginAdminUsers } from "../api/api";

const AdminLogin = ({ token, setToken, adminUser, setAdminUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogin = async (username, password) => {
    const loggedInAdmin = await loginAdminUsers(username, password);

    if (loggedInAdmin) {
      setUsername(loggedInAdmin.username);
      setToken(loggedInAdmin.token);
      setPassword("");

      history.push("/");
    }
  };

  return (
    <>
      <section class="section">
        <h1 class="title">Admin Login</h1>
        <form
          className="box"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g. username123"
                required
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="********"
                required
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="buttons has-addons is-justify-content-space-between">
            <button
              className="button is-primary"
              type="submit"
              onClick={() => {
                handleLogin(username, password);
                setAdminUser((adminUser) => "true")
              }}
            >
              Log In
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminLogin;
