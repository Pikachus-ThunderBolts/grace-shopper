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
//postProduct
// export const postProduct = async (brand, title, description, price, quantity, category, img, token) => {
//     try {
//         const gatheringData = await fetch(`${URL}/products`, {
//             method: "POST",
//             headers: {
//                 "Content-Type" : "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 brand,
//                 title,
//                 description,
//                 price,
//                 quantity,
//                 category, 
//                 img,
//             }),
//         });
//         const newProduct = await gatheringData.json();
//         return newProduct;
//     } catch (error) {
//         console.error("There was an error creating a new product", error);
//         throw error;
//     }
// }

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
//fetchGuestCart
//fetchCustomerCart
//patchGuestCart
//patchCustomerCart
//deleteGuestCart
//deleteCustomerCart
