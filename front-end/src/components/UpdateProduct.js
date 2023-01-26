import { Route, Switch, Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../api/api";

const UpdateProduct = ({token, setProducts, products}) => {
    const history = useHistory();

    const {productIdParam} = useParams();

    const individualProduct = products.find((object) => object.id == productIdParam)

    const [title, setTitle] = useState(individualProduct.title);
    const [brand, setBrand] = useState(individualProduct.brand);
    const [description, setDescription] = useState(individualProduct.description);
    const [price, setPrice] = useState(individualProduct.price);
    const [quantity, setQuantity] = useState(individualProduct.quantity);
    const [category, setCategory] = useState(individualProduct.category);
    const [img, setImg] = useState(individualProduct.img);


    const handleEditProduct = async (title, brand, description, price, quantity, category, img, productId, productIdParam) => {

        const updatedProduct = await updateProduct(title, brand, description, price, quantity, category, img, token, productId, productIdParam);
    
        setProducts((previousProducts) => [...previousProducts, updatedProduct]);
        return updatedProduct
    
    };
        
  return (
    <>
    <form className="section" onSubmit={async(event) =>{
        event.preventDefault();

        

        handleEditProduct(title, brand, description, price, quantity, category, img, productIdParam)

        setTitle('');
        setBrand('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setImg('');
        history.push(`/product/${individualProduct.id}`)

    }}>
      <section class="section">
        <h1 class="title">Update Product</h1>
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
          <button class="button is-primary">Update Product</button>
        </div>
      </section>
      </form>
    </>
  );
};

export default UpdateProduct;