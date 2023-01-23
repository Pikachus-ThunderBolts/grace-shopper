const Products = ({ products }) => {
  console.log("products", products);
  return (
    <>
      <section class="section">
        <h1 class="title">Products</h1>
        <section class="section is-white">
          <div className="tile is-ancestor ">
            {products.map((individualProduct) => {
              return (
                <div class="tile is-parent ">
                  <article class="tile is-child notification is-white">
                    <p class="title ">{individualProduct.title}</p>

                    <figure class="image is-4by3">
                      <img src={individualProduct.img}></img>
                    </figure>
                    <i class="fa-solid fa-cart-plus fa-2x"></i>
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
