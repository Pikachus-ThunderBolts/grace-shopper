const CellPhones = ({ products }) => {
  return (
    <>
      <section class="section">
        <h1 class="title">Cell Phones</h1>
        <section class="section">
          <div className="tile is-ancestor">
            {products.map((individualProduct) => {
              return (
                <>
                  {individualProduct.category === "cell phone" ? (
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
      </section>
    </>
  );
};

export default CellPhones;
