const URL = `https://tech-buy-one.onrender.com/api`;

/* PRODUCTS */
//fetchAllProducts
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log("This is the response", response);
    return response;
  } catch (error) {
    console.error("There was an error fetching the products", error);
  }
};
//fetchProduct
//createProduct
//updateProduct
//deleteProduct

/* ADMIN USERS */
//createAdminUsers
//fetchAdminUsers
//registerAdminUsers
//loginAdminUsers

/* GUEST USERS */
//createGuestUsers
//fetchGuestUsers
//registerGuestUsers
//loginGuestUsers

/* CUSTOMER USERS */
//createCustomerUsers
//fetchCustomerUsers
//registerCustomerUsers
//loginCustomerUsers

/* REVIEWS */
//fetchReviews
export const fetchReviews = async () => {
  try {
    const response = await fetch(`${URL}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log("this is reviews", response);
    return response;
  } catch (error) {
    console.error("There was an error fetching the products", error);
  }
};
//createReviews
export const createReview = async (
  title,
  review,
  customerUserId,
  productId,
  guestId
) => {
  try {
    const response = await fetch(`${URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        review,
        customerUserId,
        productId,
        guestId,
      }),
    });

    const result = await response.json();
    console.log("createReviews api call result", result);
    return result;
  } catch (error) {
    console.error("There was an error creating a new activity", error);
  }
};

//patchReviews
//deleteReviews

/* ORDERS */
//fetchAllOrders
//fetchOrder
//fetchCustomerOrder
//fetchGuestOrder
//patchOrders
//deleteOrder

/* CART */
//fetchCarts
export const fetchCarts = async () => {
  try {
    const response = await fetch(`${URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log("fetchCart response", response);
    return response;
  } catch (error) {
    console.error("There was an error fetching the cart", error);
  }
};

//fetchGuestCart
//fetchCustomerCart
//patchGuestCart
//patchCustomerCart
//deleteGuestCart
//deleteCustomerCart
