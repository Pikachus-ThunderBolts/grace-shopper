import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/Home";
import Laptops from "./components/Laptops";
import TVs from "./components/TVs";
import CellPhones from "./components/CellPhones";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Admin from "./components/Admin";

const App = () => {
  return (
    <>
      <div className="container">
        <section class="hero is-medium is-info">
          <div className="tabs">
            <Link to="/account">Account</Link>
            <div className="tabs is-right">
              {" "}
              <Link to="/admin">Admin</Link>
              <Link to="/cart">Cart</Link>
            </div>
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
          <Route path="/cart">
            <Cart></Cart>
          </Route>

          <Route path="/profile">
            <Profile></Profile>
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
