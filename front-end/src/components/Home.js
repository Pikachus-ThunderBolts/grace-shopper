import React from "react";
import { Route, Switch, Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Home</h1>
        <h2 class="subtitle">This is our Home page</h2>
        <div className="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Laptops</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png"></img>
              </figure>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">TVs</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png"></img>
              </figure>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Cell Phones</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png"></img>
              </figure>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
