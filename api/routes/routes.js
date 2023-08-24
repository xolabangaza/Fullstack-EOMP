const express = require("express");
const productController = require("../controllers/Product");



// init express router
const router = express.Router();
const {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  patchProduct,
  showProductsSorted
} = productController;
// Get All Product
router.get("/products", showProducts,);

// Get Single Product
router.get("/products/:id", showProductById);

// Create New Product
router.post("/productsAdd", createProduct);

// Update Product
router.put("/products/:id", updateProduct);

// Delete Product
router.delete("/products/:id", deleteProduct);

//Patch to change 
router.patch("/products/:id", patchProduct);

// Add a new route for sorted products
router.get("/products/:orderBy", showProductsSorted);


// export default router
 module.exports = router;


//take note of using a 'where' clause in user "on repetition"

//rapid api 