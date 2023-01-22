const Products = ({ products }) => {
  console.log("products", products);
  return (
    <>
      <section class="section">
        <h1 class="title">Products</h1>
        <section class="section has-background-info">
          <div className="tile is-ancestor">
            {products.map((individualProduct) => {
              return (
                <div class="tile is-parent">
                  <article class="tile is-child notification is-info">
                    <p class="title">{individualProduct.title}</p>
                    <figure class="image is-4by3">
                      <img src="https://bulma.io/images/placeholders/640x480.png"></img>
                    </figure>
                    <p class="subtitle">{individualProduct.category}</p>
                    <p class="subtitle">${individualProduct.price}</p>
                    <p clasName="content">{individualProduct.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
};

export default Products;
