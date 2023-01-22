


const URL = `https://tech-buy-one.onrender.com/api`

/* PRODUCTS */
//fetchAllProducts
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${URL}/products`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
        console.log("This is the response", response)
        return response;
    } catch (error) {
        console.error("There was an error fetching the products", error);
    }
}
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
//createReviews
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
export const fetchCart = async () => {
  try {
    const response = await fetch(`${URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log("fetchCart response", response)
    return response;
  } catch (error) {
    console.error("There was an error fetching the cart", error);
  };
};

//fetchGuestCart
//fetchCustomerCart
//patchGuestCart
//patchCustomerCart
//deleteGuestCart
//deleteCustomerCart

