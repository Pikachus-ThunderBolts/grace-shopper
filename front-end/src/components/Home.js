import React from "react";
import { Route, Switch, Link } from "react-router-dom";

const Home = ({ token, setToken }) => {
  return (
    <>
      <section class="section">
        <div class="columns is-mobile">
          <div class="column">
            {" "}
            <Link to="/laptops" className="link">
              <article class="tile is-child notification is-white box">
                <p class="title">Laptops</p>

                <figure class="image is-4by3">
                  <img src="https://i5.walmartimages.com/asr/ef1be66b-33ae-42c5-87da-723c26a44d48.0238c47c6780c6af7e57ba61a7cbc070.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"></img>
                </figure>
              </article>
            </Link>
          </div>
          <div class="column">
            {" "}
            <Link to="/TVs" className="link">
              <article class="tile is-child notification is-white box">
                <p class="title">TVs</p>

                <figure class="image is-4by3">
                  <img src="https://i5.walmartimages.com/asr/88ad7ed0-601e-45a2-9593-f36665430c8b.b4171379de3dfe505a01a9862dd2e193.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"></img>
                </figure>
              </article>
            </Link>
          </div>
          <div class="column">
            {" "}
            <Link to="/cellphones" className="link">
              <article class="tile is-child notification is-white box">
                <p class="title">Cell Phones</p>

                <figure class="image is-4by3">
                  <img src="https://i5.walmartimages.com/asr/69d0065e-fede-4f39-9093-d4e68d07581e.b9f41b54838d392747ab14e2cff1bcc9.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"></img>
                </figure>
              </article>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
