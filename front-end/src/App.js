import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { fetchProducts, fetchCart, fetchReviews } from "./api/api";
import Products from "./components/Products";
import Home from "./components/Home";
import Laptops from "./components/Laptops";
import TVs from "./components/TVs";
import CellPhones from "./components/CellPhones";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Admin from "./components/Admin";
import AdminProfile from "./components/AdminProfile";
import Confirmation from "./components/Confirmation";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./components/CreateProduct";
import CreateAdminUser from "./components/CreateAdminUser";

const App = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

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

  console.log("reviews", reviews);

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

  // console.log(filteredProducts, "filteredproducts");

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
                <Link to="/account" class="button is-info">
                  <strong>Sign up</strong>
                </Link>

                <Link to="/account" class="button is-light">
                  Log in
                </Link>
                <Link to="/cart" className="button is-light">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span>Cart</span>
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
            <Link to="/account" className="navbar-item">
              <span class="icon-text">
                <span class="icon">
                  <i class="fa-solid fa-user"></i>
                </span>
                <span>Account</span>
              </span>
            </Link>

            <div className="tabs is-right">
              <Link to="/admin" className="">
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
            <Home token={token}></Home>
          </Route>
          <Route path="/products">
            <Products
              products={products}
              filteredProducts={filteredProducts}
            ></Products>
          </Route>
          <Route path="/product/:productId">
            <ProductDetail
              products={products}
              reviews={reviews}
            ></ProductDetail>
          </Route>
          <Route path="/laptops">
            <Laptops
              products={products}
              filteredProducts={filteredProducts}
            ></Laptops>
          </Route>
          <Route path="/cart">
            <Cart token={token}></Cart>
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
            <Account token={token} setToken={setToken}></Account>
          </Route>
          <Route path="/admin">
            <Admin token={token} setToken={setToken}></Admin>
          </Route>
          <Route path="/adminprofile">
            <AdminProfile token={token} setToken={setToken}></AdminProfile>
          </Route>
          <Route path="/createproduct">
            <CreateProduct token={token} products={products} setProducts={setProducts}></CreateProduct>
          </Route>
          <Route path="/createadminuser">
            <CreateAdminUser token={token} setToken={setToken}></CreateAdminUser>
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
