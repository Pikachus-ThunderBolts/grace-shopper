import React, { useState } from "react";
import { registerCustomerUsers } from "../api/api";
import { useHistory } from "react-router-dom";

const Account = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegister = async (username, email, password) => {
    const newUser = await registerCustomerUsers(username, email, password);
    console.log("We are new user", newUser);
    if (newUser) {
      setUser(newUser.username);
      setToken(newUser.token);
      setUsername("");
      setEmail("");
      setPassword("");
      alert(newUser.message);
      history.push("/");
    }
  };

  return (
    <>
      <section class="section">
        <h1 class="title">Register</h1>
        <form
          class="box"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                class="input"
                value={username}
                type="text"
                placeholder="e.g. username123"
                required
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                value={email}
                type="text"
                placeholder="e.g. alex@example.com"
                required
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                value={password}
                type="password"
                placeholder="********"
                required
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
          </div>

          <button
            className="ui button"
            type="submit"
            onClick={() => {
              handleRegister(username, email, password);
            }}
          >
            Register
          </button>
        </form>
      </section>
    </>
  );
};

export default Account;
