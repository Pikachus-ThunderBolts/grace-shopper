import { Route, Switch, Link } from "react-router-dom";

const Laptops = ({ products }) => {
  return (
    <>
      <section class="section">
        <h1 class="title">Laptops</h1>
        <div className="tile is-ancestor">
          <section class="section">
            <div className="tile is-ancestor">
              {products.map((individualProduct) => {
                return (
                  <>
                    {individualProduct.category === "laptop" ? (
                      <Link
                        to={`/product/${individualProduct.id}`}
                        className="link"
                      >
                        <div class="tile is-parent">
                          <article class="tile is-child notification is-white">
                            <p class="title">{individualProduct.title}</p>
                            <figure class="image is-4by3">
                              <img src={individualProduct.img}></img>
                            </figure>
                            <p class="subtitle">{individualProduct.category}</p>
                            <p class="subtitle">${individualProduct.price}</p>
                            <p clasName="content">
                              {individualProduct.description}
                            </p>
                          </article>
                        </div>
                      </Link>
                    ) : null}
                  </>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Laptops;
