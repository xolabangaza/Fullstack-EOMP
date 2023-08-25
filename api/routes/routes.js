const express = require("express");
const productController = require("../controllers/Product");
const userController = require("../controllers/User");
const bodyParser = require('body-parser');


// init express router
const router = express.Router();
const {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  patchProduct
} = productController;

// const { showUsers,
//   showUserById,
//   createRegister,
//   loginUser,
//   deleteUser,
//   patchUser,
//   updateUser} = userController;
const {
  showUsers,
  showUserById,
  createRegister,
  loginUser,
  updateUserById,
  deleteUserById,
} = userController;
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

//User routes
// router.get('/users', showUsers);
// router.get('/users/:id', showUserById);
// router.post('/register', createRegister);
// router.post('/user/:id', loginUser);
// router.delete('/user/:id', deleteUser);
// router.patch('/user/:id', updateUser);

router.get("/products", showProducts);
router.get("/users", showUsers);
router.get("/users/:id", showUserById);
router.post("/register", createRegister);
router.post("/user/:id", loginUser);

// router.post('/login',
// bodyParser.json(), (req, res)=>{
//   users.login(req, res)
// })

// export default router
 module.exports = router;


//take note of using a 'where' clause in user "on repetition"

//rapid api 