import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { registerAdminUsers, loginAdminUsers } from "../api/api";

const AdminLogin = ({token, setToken}) => {

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
  

  // const handleRegister = async(username, email, password) => {
  //   const registerNewAdmin = await registerAdminUsers(username, email, password)

  //   if(registerNewAdmin) {
  //     setUsername(registerNewAdmin.username);
  //     setToken(registerNewAdmin.token);
  //     setEmail("")
  //     setPassword("")

  //     history.push('/')
  //   }


  // }

  const handleLogin = async(username, password) => {
    const loggedInAdmin = await loginAdminUsers(username, password)

    if(loggedInAdmin) {
      setUsername(loggedInAdmin.username);
      setToken(loggedInAdmin.token);
      setPassword("")

      history.push('/')
    }

  }
  
  /* 
  admin17
 
  */

  return (
    <>
      <section class="section">
        <h1 class="title">Admin Login</h1>
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
            handleLogin(username, password)
          }}
          >Log In</button>
          <Link to={`/adminRegister`}
          className="link">
            <button className="button is-danger">New Admin User</button>
          </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminLogin;
