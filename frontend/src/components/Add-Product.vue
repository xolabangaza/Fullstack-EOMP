<template>
  <div>


    <table>
      <tr>
        <th>Product Name</th>
        <th>Product Price</th>
        <th>Product Stock</th>
        <th>Product URL</th>
        <th>Category</th>
      </tr>
      <tr v-for="project in myProjects" :key="project.projectID">
        <td>{{ project.productName }}</td>
        <td>{{ project.productPrice }}</td>
        <td>{{ project.productStock }}</td>
        <td>{{ project.productUrl }}</td>
        <td>{{ project.category }}</td>
        <td><button @click="populateForm(project)">Edit</button></td>
        <td><button @click="editProduct">Edit Product</button></td>
        <td><button @click="deleteProduct(project.productID)">Delete</button></td>
      </tr>
    </table>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
  <div>
      <input type="text" v-model="form.productID" style="visibility: hidden; display: none" />
      <label>Product Name</label>
      <input type="text" v-model="form.productName" />
      <label>Product Price</label>
      <input type="number" v-model="form.productPrice" />
      <label>Product Stock</label>
      <input type="number" v-model="form.productStock" />
      <label>Product Url</label>
      <input type="text" v-model="form.productUrl" />
      <label>Product Category</label>
      <input type="text" v-model="form.category" />
      <br />
      <button @click="submit()">Submit</button>
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  computed: {
    myProjects() {
      return this.$store.state.myProjects;
    },
  },
  mounted() {
    this.$store.dispatch("getmyProjects");
  },
  data() {
    return {
      form: {
        productID: "",
        productName: "",
        productPrice: "",
        productStock: "",
        productUrl: "",
        category: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        if (this.form.productID) {
          await axios.put(`https://fullstackeomp-0asf.onrender.com/products/${this.form.productID}`, this.form);
          alert("Product updated successfully");
        } else {
          await axios.post("https://fullstackeomp-0asf.onrender.com/productsAdd", this.form);
          alert("Product added successfully");
        }
        this.resetForm();
        this.$store.dispatch("getmyProjects");
      } catch (error) {
        console.error("Error submitting product:", error);
      }
    },
    resetForm() {
      this.form.productID = "";
      this.form.productName = "";
      this.form.productPrice = "";
      this.form.productStock = "";
      this.form.productUrl = "";
      this.form.category = "";
    },
    populateForm(product) {
      this.form.productID = product.projectID;
      this.form.productName = product.productName;
      this.form.productPrice = product.productPrice;
      this.form.productStock = product.productStock;
      this.form.productUrl = product.productUrl;
      this.form.category = product.category;
    },

    async deleteProduct(productID) {
      try {
        await axios.delete(`https://fullstackeomp-0asf.onrender.com/products/${productID}`);
        alert("Product deleted successfully");
        this.$store.dispatch("getmyProjects");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
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
        await axios.patch(`https://fullstackeomp-0asf.onrender.com/${this.form.productID}`, editedProduct);
        alert("Product updated successfully");
        this.$store.dispatch("getmyProjects");
        this.resetForm();
      } catch (error) {
        console.error("Error editing product:", error);
      }
    },
  },
};
</script>

<style></style>
