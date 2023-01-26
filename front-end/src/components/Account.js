import { Route, Switch, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Account = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Register / Login</h1>
        <form class="box">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alex@example.com"
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
              ></input>
            </div>
          </div>

          <button class="button is-primary">Sign in</button>
        </form>
      </section>
    </>
  );
};

export default Account;
