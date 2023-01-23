const CreateProduct = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Create New Product</h1>
      </section>
      <section class="section has-background-info">
        <div class="field">
          <label class="label has-text-white">Product Title</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Product Title"
            ></input>
          </div>
        </div>

        <div class="field">
          <label class="label has-text-white">Brand</label>
          <div class="control">
            <input class="input" type="text" placeholder="Brand"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Price</label>
          <div class="control">
            <input class="input" type="text" placeholder="Price"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Quantity</label>
          <div class="control">
            <input class="input" type="text" placeholder="Quantity"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Category</label>
          <div class="control">
            <input class="input" type="text" placeholder="Category"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Image URL</label>
          <div class="control">
            <input class="input" type="text" placeholder="Image URL"></input>
          </div>
        </div>

        <div class="control">
          <button class="button is-primary">Create Product</button>
        </div>
      </section>
    </>
  );
};

export default CreateProduct;
