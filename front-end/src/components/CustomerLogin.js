import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginCustomerUsers } from "../api/api";

const CustomerLogin = ({ token, setToken, customerUser, setCustomerUser }) => {
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
    const loggedInCustomer = await loginCustomerUsers(username, password);

    if (loggedInCustomer) {
      setUsername(loggedInCustomer.username);
      setToken(loggedInCustomer.token);
      setPassword("");

      history.push("/");
    }
  };

  return (
    <>
      <section class="section">
        <h1 class="title">Customer Login</h1>
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
                setCustomerUser((customerUser) => "true")
              }}
            >
              Log In
            </button>
            <Link to={`/account`} className="link">
              <button className="button is-danger">New Customer</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default CustomerLogin;
