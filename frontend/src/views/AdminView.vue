<template>
  <div>
    <div>
      <input
        type="text"
        v-model="form.productID"
        style="visibility: hidden; display: none"
      />
      <label>Product Name</label>
      <input type="text" v-model="form.productName" />
      <label>Product Price</label>
      <input type="number" v-model="form.productPrice" />
      <label>Product Stock</label>
      <input type="number" v-model="form.productStock" />
      <label>Product Url</label>
      <input type="text" v-model="form.productUrl" />
      <label>Product Category</label>
      <!-- Fixed typo in label -->
      <input type="text" v-model="form.category" />
      <br />
      <button @click="submit()">Submit</button>
    </div>

    <table>
      <tr>
        <th>Product Name</th>
        <th>Product Price</th>
        <th>Product Stock</th>
        <th>Product URL</th>
        <th>Category</th>
      </tr>
      <tr>
        <div
          v-for="project in myProjects"
          :key="project.projectID"
          class="card"
          id="productTable"
        >
          <td>{{ project.productName }}</td>
          <td>{{ project.productPrice }}</td>
          <td>{{ project.productStock }}</td>
          <td>{{ project.productUrl }}</td>
          <td>{{ project.category }}</td>
          <td><UpdateProductVue :editProduct="editProduct"/></td>

          <td><button @click="editProduct">Edit Product</button></td>
          <!-- <td><button @click="editProduct(product)"></button></td> -->
          <td>
            <button @click="deleteProduct(project.productID)">Delete</button>
          </td>
        </div>
      </tr>
    </table>
  <div>
      <div v-if="myProjects" class=" row p-4">
      </div>
      <div v-else>Processing...</div>
    </div>
  </div>
</template>
<script>
  // import AddProduct from "@/components/Add-Product.vue";
  //   export default {
  //   computed: {
  //     myProjects() {
  //     },
  //   },
  //   mounted() {
  //   },
  //   components: { AddProduct },
  // };
import axios from "axios";
import UpdateProductVue from '../components/Update-Product.vue';
export default {
  components: {UpdateProductVue},
  computed: {
    myProjects() {
      return this.$store.state.myProjects;
    },
  },
  mounted() {
    this.$store.dispatch("getmyProjects");
  },
  name: "",
  props: {},
  data() {
    return {
      form: {
        productName: "",
        productPrice: "",
        productStock: "",
        productUrl: "",
        category: "",
      },
    };
  },
  methods: {
    async fetchProducts() {
      try {
        axios
          .get("https://fullstackeomp-0asf.onrender.com/products/:id")
          .then(function (response) {
            const products = response.data;
            const table = document.getElementById("productTable");
            products.forEach(function (product) {
              const row = table.insertRow();
              row.insertCell(1).textContent = product.productName;
              row.insertCell(2).textContent =
                "$" + product.productPrice.toFixed(2);
              row.insertCell(3).textContent = product.productStock;
              row.insertCell(4).textContent = product.productUrl;
              row.insertCell(5).textContent = product.category;
            });
          })
          .catch(function (error) {
            console.error("Error fetching products:", error);
          });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const response = await axios.get("https://fullstackeomp-0asf.onrender.com/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async submit() {
      try {
        if (this.form.productID) {
          // Update existing product
          // await axios.put(
          //   `https://fullstackeomp-0asf.onrender.com/products/${this.form.productID}`,
          //   {
          //     productName: this.form.productName,
          //     productPrice: this.form.productPrice,
          //     productStock: this.form.productStock,
          //     productUrl: this.form.productUrl,
          //     category: this.form.category,
          //   }
          // );
          alert("Product updated successfully");
        } else {
          // Add new product
          await axios.post(`https://fullstackeomp-0asf.onrender.com/productsAdd`, {
            productName: this.form.productName,
            productPrice: this.form.productPrice,
            productStock: this.form.productStock,
            productUrl: this.form.productUrl,
            category: this.form.category,
          });
          alert("Product added successfully");
        }
        this.resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error submitting product:", error);
      }
      // try {
      //   await axios.post(`http://localhost:5000/productsAdd`, {
      //     productName: this.form.productName,
      //     productPrice: this.form.productPrice,
      //     productStock: this.form.productStock,
      //     productUrl: this.form.productUrl,
      //     category: this.form.category,
      //   });
      //   alert("Product updated successfully");
      //   console.log("Product updated successfully");
      //   this.resetForm(); // Call the resetForm() method to clear the form
      //   window.location.reload();
      // } catch (error) {
      //   console.error("Error updating product:", error);
      // }
    },
    resetForm() {
      // Reset the form after successful update
      this.form.productName = "";
      this.form.productPrice = "";
      this.form.productStock = "";
      this.form.productUrl = "";
      this.form.category = "";
    },
    populateForm(product) {
      this.form.productName = product.productName;
      this.form.productPrice = product.productPrice;
      this.form.productStock = product.productStock;
      this.form.productUrl = product.productUrl;
      this.form.category = product.category;
    },
    async deleteProduct(productID) {
      try {
        const response = await axios.delete(
          `https://fullstackeomp-0asf.onrender.com/products/${productID}`
        );
        alert("Product deleted successfully");
        this.$store.dispatch("getmyProjects");
         window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },
  async editProduct() {
    try {
      const editedProduct = {
        productName: this.form.productName,
        productPrice: this.form.productPrice,
        productStock: this.form.productStock,
        productUrl: this.form.productUrl,
        category: this.form.category,
      };
      const response = await axios.patch(
        `https://fullstackeomp-0asf.onrender.com/products/${this.form.productID}`,
        editedProduct
      );
      alert("Product updated successfully");
      this.$store.dispatch("getmyProjects"); // Refresh product list
      this.resetForm();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  },
};
</script>
<style scoped>
h1 {
    text-align: center;
  }
  
  form {
    /* max-width: 800px; */
    margin: 20px auto;
  }
  
  label {
    display: block;
    margin-top: 10px;
  }
  
  input {
    display: flex;
    justify-content: center;
    width: 30%;
    height: 50px;
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