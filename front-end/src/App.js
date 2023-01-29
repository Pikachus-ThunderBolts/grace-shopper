import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import {
  fetchProducts,
  fetchCart,
  fetchReviews,
  loginAdminUsers,
} from "./api/api";
import Products from "./components/Products";
import Home from "./components/Home";
import Laptops from "./components/Laptops";
import TVs from "./components/TVs";
import CellPhones from "./components/CellPhones";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Account from "./components/Account";
import AdminLogin from "./components/AdminLogin";
import CustomerLogin from "./components/CustomerLogin";
import AdminProfile from "./components/AdminProfile";
import Confirmation from "./components/Confirmation";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./components/CreateProduct";
import CreateAdminUser from "./components/CreateAdminUser";
import UpdateProduct from "./components/UpdateProduct";
import UpdateReview from "./components/UpdateReview";
import AdminRegister from "./components/AdminRegister";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
const adminFromLocalStorage = JSON.parse(localStorage.getItem("admin") || null);
const App = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [localCart, setLocalCart] = useState(cartFromLocalStorage);
  const [adminUser, setAdminUser] = useState(adminFromLocalStorage);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState("");

  console.log("localcart on app", localCart.length);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem("admin", JSON.stringify(adminUser));
    } else {
      localStorage.removeItem("admin");
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [localCart]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();

      setProducts(products);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await fetchReviews();

      setReviews(reviews);
    };
    getReviews();
  }, []);

  useEffect(() => {
    const searchTermLower = searchTerm.toLowerCase().split(" ");
    if (searchTermLower) {
      const filtered = products.filter((productsObject) => {
        const filterableValues = [
          productsObject.title,
          productsObject.description,
          productsObject.brand,
          productsObject.price,
          productsObject.category,
        ];

        for (let value of filterableValues) {
          if (value.toLowerCase().includes(searchTermLower)) {
            return true;
          }
        }
        return false;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const LogOut = ({ setToken }) => {
    return (
      <button
        className="button is-light"
        onClick={() => {
          setToken("");
          setAdminUser("");
        }}
      >
        Sign Out
      </button>
    );
  };

  return (
    <>
      <nav class="navbar " role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <Link to="/">
            <h1 className="navbar-item is-size-2 has-text-info has-text-weight-semibold">
              Tech-Buy!
            </h1>
          </Link>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <div className="navbar-item">
              <input
                class="navbar-item input is-rounded"
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              ></input>
            </div>

            <Link to="/" className="navbar-item">
              <a class="navbar-item">Home</a>
            </Link>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Categories</a>

              <div class="navbar-dropdown">
                <Link to="/laptops" class="navbar-item">
                  Laptops
                </Link>
                <Link to="/TVs" class="navbar-item">
                  TVs
                </Link>
                <Link to="/cellphones" class="navbar-item">
                  Cell Phones
                </Link>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                {token ? null : (
                  <Link to="/account" class="button is-info">
                    <strong>Sign up</strong>
                  </Link>
                )}

                {token ? (
                  <LogOut setToken={setToken} className="button is-light" />
                ) : null}

                {token && adminUser ? (
                  <Link to="/adminprofile" className="button">
                    <strong>Admin Profile</strong>
                  </Link>
                ) : null}
                {!token ? (
                  <Link to="/customerLogin" className="button">
                    <strong>Returning Customer</strong>
                  </Link>
                ) : (
                  <Link to="/" className="button">
                    <strong> Customer Profile</strong>
                  </Link>
                )}

                <Link to="/cart" className="button is-light">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span>Cart ({localCart.length})</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container is-widescreen">
        <section class="hero is-medium is-info ">
          <div className="tabs">
            <Link to="/customerLogin" className="navbar-item">
              <span class="icon-text">
                <span class="icon">
                  <i class="fa-solid fa-user"></i>
                </span>
                <span>Customer Login</span>
              </span>
            </Link>

            <div className="tabs is-right">
              <Link to="/adminLogin" className="">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fa-solid fa-users"></i>
                  </span>
                  <span>Admin</span>
                </span>
              </Link>
            </div>
          </div>
          <div class="hero-body">
            <Link to="/" class="title is-size-1">
              Tech-Buy!
            </Link>
          </div>
          <hr></hr>
          <div className="tabs">
            <Link to="/products" className="">
              All Products
            </Link>

            <Link to="/laptops" className="">
              Laptops
            </Link>
            <Link to="/tvs" className="">
              TVs
            </Link>
            <Link to="/cellphones" className="">
              Cell Phones
            </Link>
          </div>
        </section>

        <Switch>
          <Route exact path="/">
            <Home token={token} setToken={setToken}></Home>
          </Route>
          <Route path="/products">
            <Products
              products={products}
              setProducts={setProducts}
              token={token}
              filteredProducts={filteredProducts}
              adminUser={adminUser}
              setAdminUser={setAdminUser}
              localCart={localCart}
              setLocalCart={setLocalCart}
            ></Products>
          </Route>
          <Route path="/product/:productIdParam">
            <ProductDetail
              products={products}
              reviews={reviews}
              setReviews={setReviews}
              setProducts={setProducts}
              token={token}
              localCart={localCart}
              setLocalCart={setLocalCart}
              adminUser={adminUser}
              setAdminUser={setAdminUser}
            ></ProductDetail>
          </Route>
          <Route path="/laptops">
            <Laptops
              products={products}
              filteredProducts={filteredProducts}
            ></Laptops>
          </Route>
          <Route path="/cart">
            <Cart
              token={token}
              localCart={localCart}
              setLocalCart={setLocalCart}
              setTotal={setTotal}
              total={total}
            ></Cart>
          </Route>
          <Route path="/checkout">
            <Checkout token={token}></Checkout>
          </Route>
          <Route path="/confirmation">
            <Confirmation></Confirmation>
          </Route>

          <Route path="/profile">
            <Profile token={token} setToken={setToken}></Profile>
          </Route>

          <Route path="/tvs">
            <TVs products={products} filteredProducts={filteredProducts}></TVs>
          </Route>
          <Route path="/cellphones">
            <CellPhones
              products={products}
              filteredProducts={filteredProducts}
            ></CellPhones>
          </Route>
          <Route path="/account">
            <Account
              token={token}
              setToken={setToken}
              setUser={setUser}
            ></Account>
          </Route>

          <Route path="/customerLogin">
            <CustomerLogin token={token} setToken={setToken}></CustomerLogin>
          </Route>

          <Route path="/adminLogin">
            <AdminLogin
              token={token}
              setToken={setToken}
              adminUser={adminUser}
              setAdminUser={setAdminUser}
            ></AdminLogin>
          </Route>
          <Route path="/adminRegister">
            <AdminRegister token={token} setToken={setToken}></AdminRegister>
          </Route>
          <Route path="/adminprofile">
            <AdminProfile
              token={token}
              setToken={setToken}
              adminUser={adminUser}
              setAdminUser={setAdminUser}
            ></AdminProfile>
          </Route>
          <Route path="/createproduct">
            <CreateProduct
              token={token}
              products={products}
              setProducts={setProducts}
              adminUser={adminUser}
              setAdminUser={setAdminUser}
            ></CreateProduct>
          </Route>
          <Route path="/updateProduct/:productIdParam">
            <UpdateProduct
              token={token}
              products={products}
              setProducts={setProducts}
              adminUser={adminUser}
              setAdminUser={setAdminUser}
            ></UpdateProduct>
          </Route>
          <Route path="/updateReview/:productIdParam">
            <UpdateReview
              token={token}
              reviews={reviews}
              setReviews={setReviews}
            ></UpdateReview>
          </Route>
          <Route path="/createadminuser">
            <CreateAdminUser
              token={token}
              setToken={setToken}
              products={products}
              setProducts={setProducts}
              adminUser={adminUser}
              setAdminUser={setAdminUser}
            ></CreateAdminUser>
          </Route>
        </Switch>
      </div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Tech-Buy!</strong>
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
