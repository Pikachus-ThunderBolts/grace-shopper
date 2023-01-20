import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/Home";
import Laptops from "./components/Laptops";
import TVs from "./components/TVs";
import CellPhones from "./components/CellPhones";
import Account from "./Account";
import Admin from "./Admin";

const App = () => {
  return (
    <>
      <div className="container">
        <section class="hero is-large is-info">
          <div className="tabs">
            <Link to="/account">Account</Link>
            <Link to="/admin">Admin</Link>
          </div>
          <div class="hero-body">
            <Link to="/" class="title">
              Tech-Buy!
            </Link>
          </div>
          <div className="tabs">
            <Link to="/products">All Products</Link>
            <Link to="/laptops">Laptops</Link>
            <Link to="/tvs">TVs</Link>
            <Link to="/cellphones">Cell Phones</Link>
          </div>
        </section>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/products">
            <Products></Products>
          </Route>
          <Route path="/laptops">
            <Laptops></Laptops>
          </Route>
          <Route path="/tvs">
            <TVs></TVs>
          </Route>
          <Route path="/cellphones">
            <CellPhones></CellPhones>
          </Route>
          <Route path="/account">
            <Account></Account>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
        </Switch>
        <footer class="footer">
          <div class="content has-text-centered">
            <p>
              <strong>Tech-Buy!</strong>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
