const Products = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Products</h1>
        <h2 class="subtitle">This is where Products will live.</h2>
        <div className="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Middle tile</p>
              <p class="subtitle">With an image</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png"></img>
              </figure>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Middle tile</p>
              <p class="subtitle">With an image</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png"></img>
              </figure>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">Middle tile</p>
              <p class="subtitle">With an image</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png"></img>
              </figure>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
