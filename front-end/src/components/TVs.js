import { Route, Switch, Link } from "react-router-dom";

const TVs = ({ products, filteredProducts }) => {
  return (
    <>
      <section class="section">
        <h1 class="title">TVs</h1>
        <section class="section">
          {filteredProducts.map((individualProduct) => {
            return (
              <>
                {individualProduct.category === "TV" ? (
                  <div className="tile is-ancestor">
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
                          <p clasName="content">
                            {individualProduct.description}
                          </p>
                        </article>
                      </div>
                    </Link>
                  </div>
                ) : null}
              </>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default TVs;
