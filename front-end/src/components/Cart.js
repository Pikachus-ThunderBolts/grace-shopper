import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchCart, fetchGuestCart, createGuestUsers } from "../api/api";

const Cart = ({ localCart, setLocalCart, total, setTotal, token, setToken }) => {
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
  const history = useHistory();

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const handleRegister = async (email) => {
    
    // const registeredGuest = await createGuestUsers(email); 
    console.log("New Guest user", registeredGuest);

    if(registeredGuest) {
      setEmail(registeredGuest.email);
    }
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
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <button 
          class="button is-info is-inline"
          onClick={() => {
            handleRegister(email);
          }}
          >Submit</button>
        </span>

        <table className="table is-bordered is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
            {localCart.map((individualProduct) => {
              return (
                <tr>
                  <th>{individualProduct.title}</th>
                  <th>${individualProduct.price}</th>
                  <th>
                    <button
                      class="button is-danger is-light"
                      onClick={(event) => {
                        event.preventDefault();
                        removeItemFromCart(individualProduct);
                        console.log("click");
                      }}
                    >
                      X
                    </button>
                  </th>
                </tr>
              );
            })}
            <th>Total</th>
            <th>${total}</th>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Cart;
