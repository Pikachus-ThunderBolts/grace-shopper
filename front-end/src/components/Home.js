import React from "react";
import { Route, Switch, Link } from "react-router-dom";

const Home = ({token, setToken}) => {
  return (
    <>
      <section class="section">
        <h1 class="title">Home</h1>

        <div className="tile is-ancestor">
          <Link to="/laptops" className="link">
            <div class="tile is-parent">
              <article class="tile is-child notification is-white box">
                <p class="title">Laptops</p>

                <figure class="image is-4by3">
                  <img src="https://i5.walmartimages.com/asr/ef1be66b-33ae-42c5-87da-723c26a44d48.0238c47c6780c6af7e57ba61a7cbc070.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"></img>
                </figure>
              </article>
            </div>
          </Link>
          <Link to="/TVs" className="link">
            <div class="tile is-parent">
              <article class="tile is-child notification is-white box">
                <p class="title">TVs</p>

                <figure class="image is-4by3">
                  <img src="https://i5.walmartimages.com/asr/88ad7ed0-601e-45a2-9593-f36665430c8b.b4171379de3dfe505a01a9862dd2e193.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"></img>
                </figure>
              </article>
            </div>
          </Link>
          <Link to="/cellphones" className="link">
            <div class="tile is-parent">
              <article class="tile is-child notification is-white box">
                <p class="title">Cell Phones</p>

                <figure class="image is-4by3">
                  <img src="https://i5.walmartimages.com/asr/69d0065e-fede-4f39-9093-d4e68d07581e.b9f41b54838d392747ab14e2cff1bcc9.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"></img>
                </figure>
              </article>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
