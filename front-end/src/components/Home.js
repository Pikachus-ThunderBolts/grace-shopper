import React from "react";
import { Route, Switch, Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Home</h1>
        <div className="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <Link to="/laptops">
                <p class="title">Laptops</p>
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png"></img>
                </figure>
              </Link>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <Link to="/TVs">
                <p class="title">TVs</p>
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png"></img>
                </figure>
              </Link>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <Link to="/cellphones">
                <p class="title">Cell Phones</p>
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png"></img>
                </figure>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
