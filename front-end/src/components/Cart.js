import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { fetchCart, fetchGuestCart} from "../api/api";


const Cart = () => {

  // const [token, setToken] = useState(window.localStorage.getItem("token") || null);
  // console.log(token);
  // const [cart, setCart] = useState([])
  // const [guestCart, setGuestCart] = useState([]);

  // useEffect(()=>{
  //   const getCart = async () => {
  //     const cart = await fetchCart();

  //     setCart(cart);
  //   }
  //   getCart();
  // }, []);

  // useEffect(() =>{
  //   const getGuestCart = async () => {
  //     const guestCart = await fetchGuestCart(guestId);
  //     setGuestCart(guestCart);
  //   }
  //   getGuestCart();
  // }, []);

  return (
    <>
      <section class="section checkout">
        <h1 class="title">Cart</h1>
      </section>
      <section class="section">
        <h2 class="subtitle has-text-weight-semibold">
          Please enter your email address to save your cart
        </h2>
        <span className="content">
          {" "}
          <input
            class="content input is-link is-inline"
            type="text"
            placeholder="e.g. alex@example.com"
          ></input>
          <button class="button is-info is-inline">Submit</button>
        </span>

        <table className="table is-bordered is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            <tr>
              <th>1</th>
              <td>Dummy Item</td>
              <td>0.00</td>
              <td>1</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Dummy Item 2</td>
              <td>0.00</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Cart;
