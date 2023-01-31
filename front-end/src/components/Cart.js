import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchCart, fetchGuestCart, createGuestUsers } from "../api/api";
import { GuestRegister } from "./GuestMessage";

const Cart = ({
  localCart,
  setLocalCart,
  total,
  setTotal,
  token,
  setToken,
  copyLocalCart,
  setCopyLocalCart
}) => {
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

  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const handleRegister = () => {
    setRegistered(true);
  };

  function removeItemFromCart(id) {
    let temp = localCart.filter((item) => item !== id);
    console.log("temp", temp);
    setLocalCart(temp);

    return temp;
  }

  localCart.forEach((item) => {
    total += Number(item.price);
  });

  console.log("total", total);

  return (
    <>
      <section class="section checkout">
        <h1 class="title">Cart</h1>
      </section>
      <section className="section">
        {/* {!token ? (<>
        <h2 className="subtitle has-text-weight-semibold">
          Please enter your email address to save your cart
        </h2>
        <span className="content">
          {" "}
          <input
            className="content input is-link is-inline"
            type="text"
            placeholder="e.g. alex@example.com"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <button class="button is-info is-inline" onClick={handleRegister}>
            Submit
          </button>
          <div>{registered && <GuestRegister />}</div>
        </span>
        </>) : (null)} */}
        <span></span>
        {localCart.length != 0 ? (<button 
        className="button is-danger is-light empty"
        onClick={() => {
          setLocalCart([]);
        }}
        > Empty Cart
      </button>) : (
        null
        )}
        

        <table className="table is-bordered is-hoverable is-fullwidth">
          <tbody>
            <tr>
            {localCart.length != 0 ? (
            <>
              <th>Name</th>
              <th>Price</th>
              <th>Remove</th>
            </>
            ) : (
            <>
              <h2 className="subtitle">Cart is Empty</h2>
              <span></span>
            </>
            )}
              
            </tr>
            {localCart.map((individualProduct) => {
              return (
                <tr>
                  <th>{individualProduct.title}</th>
                  <th>${individualProduct.price}</th>
                  <th>
                    <button
                      className="button is-danger is-light"
                      onClick={(event) => {
                        event.preventDefault();
                        removeItemFromCart(individualProduct);
                      }}
                    >
                      X
                    </button>
                  </th>
                </tr>
              );
            })}
            {localCart.length != 0 ? (
              <>
                <th>Total</th>
                <th>${total}</th>
              </>
            ) : (null)}
            
          </tbody>
        </table>
        {localCart.length != 0 ? (
          <>
            <Link to="/checkout">
              <button 
              className="button is-danger is-light"
              onClick={() => {
              setCopyLocalCart(localCart)
              }}
              > Checkout </button>
            </Link>
          </>
        ): (
          <>
          <Link to="/products">
            <button
            className="button is-info"
            > Add Items to Cart
            </button>
          </Link>
          </>
        )}
        
      </section>
    </>
  );
};

export default Cart;
