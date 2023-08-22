<template>
<div>
 <h1>Add New Product</h1>
    <form id="add-product-form">
         <label for="product-name">Product Name:</label>
        <input type="text" id="product-name" required>
        <br>
       <label for="product-image">Product Image URL:</label>
       <input type="text" id="product-image" required>
       <br>
       <label for="product-price">Product Price:</label>
      <input type="number" id="product-price" required>
       <br>
      <button type="submit">Add Product</button>
  </form>

  <h2>Product List</h2>
  <table>
    <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
        </tr>
    </thead>
    <tbody id="product-table">

    </tbody>
   
  </table>
  </div>
    
</template>
<script>
export default {
    
}
</script>
<style scoped>
h1 {
    text-align: center;
  }
  
  form {
    max-width: 400px;
    margin: 20px auto;
  }
  
  label {
    display: block;
    margin-top: 10px;
  }
  
  input {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border-radius: 8px;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: rgb(183, 116, 183);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color:purple;
  }
  h2{
    color: #0056b3;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
   
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
    
</style>