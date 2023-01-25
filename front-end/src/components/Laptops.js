import { Route, Switch, Link } from "react-router-dom";

const Laptops = ({ products, filteredProducts }) => {
  return (
    <>
      <section class="section">
        <h1 class="title">Laptops</h1>

        <section class="section">
          <div className="tile is-ancestor">
            {filteredProducts.map((individualProduct) => {
              return (
                <>
                  {individualProduct.category === "laptop" ? (
                    <Link
                      to={`/product/${individualProduct.id}`}
                      className="link"
                    >
                      <div class="tile is-parent">
                        <article class="tile is-child notification is-white box">
                          <p class="title">{individualProduct.title}</p>
                          <figure class="image is-4by3">
                            <img src={individualProduct.img}></img>
                          </figure>
                          <p class="subtitle">{individualProduct.category}</p>
                          <p class="subtitle">${individualProduct.price}</p>
                          <p className="content">
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
      </section>
    </>
  );
};

export default Laptops;
