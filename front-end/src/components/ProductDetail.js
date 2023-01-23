const ProductDetail = () => {
  return (
    <>
      <section class="section">
        <div className="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child notification is-white">
              <p class="title">Product 1</p>
              <p class="subtitle">Price</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png"></img>
              </figure>
              <p class="content">Brand</p>
              <p class="content">Description</p>
              <button class="button is-focused">Add to Cart</button>
            </article>
          </div>
        </div>
      </section>
      <section class="section has-background-info">
        <h1 class="title has-text-white">Reviews</h1>
        <br></br>
        <h2 class="subtitle has-text-white">Review Title</h2>
        <p classname="content has-text-white">
          This is where users will leave reviews.{" "}
        </p>
      </section>
    </>
  );
};

export default ProductDetail;
