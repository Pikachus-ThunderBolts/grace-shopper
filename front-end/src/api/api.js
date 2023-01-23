const URL = `http://localhost:4000/api`



// const makeHeaders = (token) => {
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }
// //  console.log(headers);
//   return headers;
// };


// export const apiCall = async (endpoint, defaultOptions= {}) => {
//   const {token, method, body} = defaultOptions;
  
//   const options = {};
//   options.headers = makeHeaders(token);
//   if (method) {
//     options.method = method;
//   };
//   if (body) {
//     options.body = JSON.stringify(body);
//   }
//     const response = await fetch(`${BASEURL}/${endpoint}`, options);
//     const result = await response.json();
//     console.log(result);
//     return result;
// }



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
  console.log();
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

//fetchGuestCart



//fetchCustomerCart
//patchGuestCart
//patchCustomerCart
//deleteGuestCart
//deleteCustomerCart

