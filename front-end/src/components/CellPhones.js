const CellPhones = ({ products }) => {
  return (
    <>
      <section class="section">
        <h1 class="title">Cell Phones</h1>
        <section class="section has-background-info">
          <div className="tile is-ancestor">
            {products.map((individualProduct) => {
              return (
                <>
                  {individualProduct.category === "cell phone" ? (
                    <div class="tile is-parent">
                      <article class="tile is-child notification is-info">
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
