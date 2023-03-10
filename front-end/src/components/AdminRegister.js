import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { registerAdminUsers, loginAdminUsers } from "../api/api";

const AdminRegister = ({token, setToken}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);
  

  const handleRegister = async(username, email, password) => {
    const registerNewAdmin = await registerAdminUsers(username, email, password)

    if(registerNewAdmin) {
      setUsername(registerNewAdmin.username);
      setToken(registerNewAdmin.token);
      setEmail("")
      setPassword("")

      history.push('/')
    }


  }
  

  return (
    <>
      <section class="section">
        <h1 class="title">Admin Register</h1>
        <form 
        className="box"
        onSubmit={(event) => {
          event.preventDefault();
        }}>
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
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
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
                type="password"
                placeholder="********"
                required
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
          </div>

          <button 
          className="button is-primary"
          type="submit"
          onClick={() => {
            handleRegister(username, email, password)
          }}
          >Register</button>
          
        </form>
      </section>
    </>
  );
};

export default AdminRegister;
