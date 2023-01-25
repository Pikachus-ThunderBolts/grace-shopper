const URL = `http://localhost:4000/api`


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

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYXRlIiwiaWF0IjoxNjc0NDUzOTMxfQ.6maX6JqG_4LeBS3GJ_G7Hc2NxZA3tPqQCe26LBzLm5Y'

export const fetchCart = async () => {
  try {
    const response = await fetch(`${URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => response.json());
    console.log(token);
    console.log("fetchCart response", response)
    return response;
  } catch (error) {
    console.error("There was an error fetching the cart", error);
  };
};

// //fetchGuestCart
// export const fetchGuestCart = async (guestId) => {
//   try {
//     const response = await fetch(`${URL}/cart`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//     }).then((response) => response.json());
//     console.log("fetchGuestCart response", response)
//     return response;
//   } catch (error) {
//     console.error("Error fetching guestCart", error)
//   };
// };


//fetchCustomerCart
//patchGuestCart
//patchCustomerCart
//deleteGuestCart
//deleteCustomerCart

