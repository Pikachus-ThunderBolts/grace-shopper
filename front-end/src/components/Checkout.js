import { Link } from "react-router-dom";
import Cart from "./Cart";

const Checkout = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Checkout</h1>
        {/* <Cart></Cart> */}
      </section>
      <section class="section has-background-info">
        <h1 class="title has-text-white">Shipping Address</h1>
        <div class="field">
          <label class="label has-text-white">Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g Alex Smith"
            ></input>
          </div>
        </div>

        <div class="field">
          <label class="label has-text-white">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
            ></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Address</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">City</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">State</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Zip</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <h1 class="title has-text-white">Payment Information</h1>
        <div class="field">
          <label class="label has-text-white">Card Number</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Expiration Date</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">CVV</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-white">Billing Zip</label>
          <div class="control">
            <input class="input" type="text"></input>
          </div>
        </div>
        <div class="control">
          <Link to="/confirmation">
            <button class="button is-primary">Place Order</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Checkout;
