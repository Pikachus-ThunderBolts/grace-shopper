import { Route, Switch, Link } from "react-router-dom";

const TVs = ({ products, filteredProducts }) => {
  let firstList = [...filteredProducts];
  let secondList = [...filteredProducts];
  firstList.splice(0, filteredProducts.length / 2);
  secondList.splice(filteredProducts.length / 2, filteredProducts.length - 1);
  return (
    <>
      <section class="section">
        <h1 class="title has-text-centered">TVs</h1>
        <section class="section">
          <div className="container">
            <div className="column is-multiline">
              <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                  {firstList.map((individualProduct) => {
                    return (
                      <>
                        {individualProduct.category === "TV" ? (
                          <div className="tile is-child box">
                            <Link
                              to={`/product/${individualProduct.id}`}
                              className="link"
                            >
                              <article class="tile is-child notification is-white">
                                <p class="title">{individualProduct.title}</p>
                                <p className="subtitle">
                                  {individualProduct.description}
                                </p>
                                <div class="buttons is-justify-content-space-between">
                                  <p className="subtitle">
                                    {individualProduct.price}
                                  </p>
                                  <button
                                    class="button is-info is-rounded"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setLocalCart((localCart) => [
                                        ...localCart,
                                        individualProduct,
                                      ]);
                                    }}
                                  >
                                    +Add
                                  </button>
                                </div>

                                <figure class="has-text-centered">
                                  <img
                                    src={individualProduct.img}
                                    width="300"
                                    height="400"
                                  ></img>
                                </figure>
                              </article>
                            </Link>
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                </div>
                <div className="tile is-parent is-vertical">
                  {secondList.map((individualProduct) => {
                    return (
                      <>
                        {individualProduct.category === "TV" ? (
                          <div className="tile is-child box">
                            <Link
                              to={`/product/${individualProduct.id}`}
                              className="link"
                            >
                              <article class="tile is-child notification is-white">
                                <p class="title">{individualProduct.title}</p>
                                <p className="subtitle">
                                  {individualProduct.description}
                                </p>
                                <div class="buttons is-justify-content-space-between">
                                  <p className="subtitle">
                                    {individualProduct.price}
                                  </p>
                                  <button
                                    class="button is-info is-rounded"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setLocalCart((localCart) => [
                                        ...localCart,
                                        individualProduct,
                                      ]);
                                    }}
                                  >
                                    +Add
                                  </button>
                                </div>

                                <figure class="has-text-centered">
                                  <img
                                    src={individualProduct.img}
                                    width="300"
                                    height="400"
                                  ></img>
                                </figure>
                              </article>
                            </Link>
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default TVs;
