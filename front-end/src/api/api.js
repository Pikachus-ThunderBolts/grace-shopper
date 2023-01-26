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
    // console.log("this is products", response)
    return response;
  } catch (error) {
    console.error("There was an error fetching the products in the api call", error);
  }
};

//createProduct
export const createProduct = async (brand, title, description, price, quantity, category, img, token) => {
  try {
      const gatheringData = await fetch(`${URL}/products`, {
          method: "POST",
          headers: {
              "Content-Type" : "application/json",
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
      console.error("There was an error creating a new product in the api call", error);
      throw error;
  }
}

//updateProduct
export const updateProduct = async (brand, title, description, price, quantity, category, img, token, productId) => {
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
        img
      }),
    });

    const editedProduct = await gatheringData.json();
    return editedProduct;
  } catch (error) {
    console.error("There was an error editing the product in the api call", error);
    throw error;
  }
}

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
    console.error("There was an error deleting a product in the api call", error);
    throw error;
  }
};

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

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYXRlIiwiaWF0IjoxNjc0NDUzOTMxfQ.6maX6JqG_4LeBS3GJ_G7Hc2NxZA3tPqQCe26LBzLm5Y'

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
