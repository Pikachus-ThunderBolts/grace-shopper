const URL = `https://tech-buy-one.onrender.com/api`;
// const URL = "http://localhost:4000";

/* PRODUCTS */
//fetchAllProducts
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    return response;
  } catch (error) {
    console.error(
      "There was an error fetching the products in the api call",
      error
    );
  }
};

//createProduct
export const createProduct = async (
  brand,
  title,
  description,
  price,
  quantity,
  category,
  img,
  token
) => {
  try {
    const gatheringData = await fetch(`${URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        brand,
        title,
        description,
        price,
        quantity,
        category,
        img,
      }),
    });
    const newProduct = await gatheringData.json();
    return newProduct;
  } catch (error) {
    console.error(
      "There was an error creating a new product in the api",
      error
    );
    throw error;
  }
};

//updateProduct
export const updateProduct = async (
  title,
  brand,
  description,
  price,
  quantity,
  category,
  img,
  token,
  productId
) => {
  try {
    const gatheringData = await fetch(`${URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        brand,
        title,
        description,
        price,
        quantity,
        category,
        img,
      }),
    });

    const editedProduct = await gatheringData.json();
    return editedProduct;
  } catch (error) {
    console.error(
      "There was an error editing the product in the api call",
      error
    );
    throw error;
  }
};

//deleteProduct
export const deleteProduct = async (productId, token) => {
  try {
    const gatheringData = await fetch(`${URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const deletedProduct = await gatheringData.json();

    return deletedProduct;
  } catch (error) {
    console.error(
      "There was an error deleting a product in the api call",
      error
    );
    throw error;
  }
};

/* ADMIN USERS */
//fetchAdminUsers
export const fetchAdminUsers = async () => {
  try {
    const response = await fetch(`${URL}/adminUsers`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log("this is the response for adminUsers", response);
    return response;
  } catch (error) {
    console.error("There was an error fetching admin users");
  }
};
//registerAdminUsers
export const registerAdminUsers = async (username, email, password) => {
  try {
    const response = await fetch(`${URL}/adminUsers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const result = await response.json();
    console.log(result, "this is the result of register admin users");
    return result;
  } catch (error) {
    console.error("Error registering the admin user", error);
  }
};

// //loginAdminUsers
export const loginAdminUsers = async (username, password) => {
  try {
    const response = await fetch(`${URL}/adminUsers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error logging in the admin user", error);
    throw error;
  }
};

/* GUEST USERS */
//createGuestUsers
export const createGuestUsers = async (email) => {
  try {
    const response = await fetch(`${URL}/guestUsers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    });
    const result = await response.json();
    console.log("New Guest user created", result);
    return result;
  } catch (error) {
    console.error("Error registering the guest user", error);
    console.log("What is going on", error);
  }
};
//fetchGuestUsers
//registerGuestUsers
//loginGuestUsers

/* CUSTOMER USERS */
//fetchCustomerUsers
export const fetchCustomerUsers = async () => {
  try {
    const response = await fetch(`${URL}/customerUsers`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    return response;
  } catch (error) {
    console.error("There was an error fetching customer user");
  }
};
//registerCustomerUsers
export const registerCustomerUsers = async (username, email, password) => {
  try {
    const response = await fetch(`${URL}/customerUsers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const result = await response.json();
    console.log(result, "this is the result of register customer users");
    return result;
  } catch (error) {
    console.error("Error registering the customer user", error);
  }
};
//loginCustomerUsers
export const loginCustomerUsers = async (username, password) => {
  try {
    const response = await fetch(`${URL}/customerUsers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error logging in the customer user", error);
    throw error;
  }
};

/* REVIEWS */
//fetchReviews
export const fetchReviews = async () => {
  try {
    const response = await fetch(`${URL}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    return response;
  } catch (error) {
    console.error("There was an error fetching the products", error);
  }
};
//createReviews
export const createReview = async (
  title,
  review,
  productId,
  customerUserId,
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
        productId,
        customerUserId,
        guestId,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error creating a new activity", error);
  }
};

//patchReviews
export const updateReview = async (
  id,
  title,
  review,
  productId,
  customerUserId,
  guestId,
  token
) => {
  try {
    const gatheringData = await fetch(`${URL}/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        review,
        productId,
        customerUserId,
        guestId,
      }),
    });

    const editedReview = await gatheringData.json();
    return editedReview;
  } catch (error) {
    console.error("There was an error editing the review in the api", error);
    throw error;
  }
};

//deleteReviews
export const deleteReview = async (id, token) => {
  try {
    const response = await fetch(`${URL}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log("this review was deleted: ", result);
    return result;
  } catch (error) {
    console.log("there was an error deleting a review: ", error);
    throw error;
  }
};

/* ORDERS */
//fetchAllOrders
//fetchOrder
//fetchCustomerOrder
//fetchGuestOrder
//patchOrders
//deleteOrder

/* CART */
//fetchCarts

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYXRlIiwiaWF0IjoxNjc0NDUzOTMxfQ.6maX6JqG_4LeBS3GJ_G7Hc2NxZA3tPqQCe26LBzLm5Y'

export const fetchCart = async () => {
  try {
    const response = await fetch(`${URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
    // console.log(token);
    // console.log("fetchCart response", response);

    return response;
  } catch (error) {
    console.error("There was an error fetching the cart", error);
  }
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
