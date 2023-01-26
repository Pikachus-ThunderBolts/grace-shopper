import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createProduct } from "../api/api";

const CreateProduct = ({token, setProducts}) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');

  return (
    <>
    <form className="section" onSubmit={async(event) =>{
      event.preventDefault();

      const newProduct = await createProduct(brand, title, description, price, quantity, category, img, token);

      if(newProduct) {
        setProducts((previousProducts) => [...previousProducts, newProduct])
        setTitle('');
        setBrand('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setImg('');
        history.push('/products')
      }else {
        console.error("There was an error making new products in createProducts file", error);
      }

    }}>
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
              required autoComplete="off"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
              }}
            ></input>
          </div>
        </div>

        <div class="field">
          <label class="label has-text-white">Brand</label>
          <div class="control">
            <input class="input" 
            type="text" 
            placeholder="Brand"
            required autoComplete="off"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value)
            }}
            ></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Description</label>
          <div class="control">
            <input class="input"
            type="text"
            placeholder="Description"
            required autoComplete="off"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
            }}
            ></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Price</label>
          <div class="control">
            <input class="input" 
            type="text" 
            placeholder="Price"
            required autoComplete="off"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value)
              }}
            ></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Quantity</label>
          <div class="control">
            <input class="input" 
            type="text" 
            placeholder="Quantity"
            required autoComplete="off"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value)
            }}
            ></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Category</label>
          <div class="control">
            <input class="input" 
            type="text" 
            placeholder="Category"
            required autoComplete="off"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value)
            }}
            ></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Image URL</label>
          <div class="control">
            <input class="input" 
            type="text" 
            placeholder="Image URL"
            required autoComplete="off"
            value={img}
            onChange={(event) => {
              setImg(event.target.value)
            }}
            ></input>
          </div>
        </div>

        <div class="control">
          <button class="button is-primary">Create Product</button>
        </div>
      </section>
      </form>
    </>
  );
};

export default CreateProduct;
