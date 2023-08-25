<template>
  <div>
    <div class="text-center">
      <h3 class="text-center">Add Products</h3>
      <input
        type="text"
        v-model="form.productID"
        style="visibility: hidden; display: none"
      />
      <label>Product Name</label>
      <input class="just" type="text" v-model="form.productName" />
      <label>Product Price</label>
      <input class="just" type="number" v-model="form.productPrice" />
      <label>Product Stock</label>
      <input class="just" type="number" v-model="form.productStock" />
      <label>Product Url</label>
      <input class="just" type="text" v-model="form.productUrl" />
      <label>Product Category</label>
      <!-- Fixed typo in label -->
      <input class="just" type="text" v-model="form.category" />
      <br />
      <button class="button" @click="submit()">Submit</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Stock</th>
          <th>Product URL</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in myProjects" :key="project.projectID">
          <td>{{ project.productName }}</td>
          <td>{{ project.productPrice }}</td>
          <td>{{ project.productStock }}</td>
          <td><img :src="project.productUrl" :alt="project.productName" /></td>
          <td>{{ project.category }}</td>
          <td>
            <!-- <button>

      <SingleUpdateProductModal :form="form" @update-product="editProduct()" />
        </button> -->
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="populateForm(project)"
            >
              Edit
            </button>

            <!-- modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Update Product
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <label>Product Name</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="form.productName"
                    />
                    <label>Product Price</label>
                    <input
                      class="form-control"
                      type="number"
                      v-model="form.productPrice"
                    />
                    <label>Product Stock</label>
                    <input
                      class="form-control"
                      type="number"
                      v-model="form.productStock"
                    />
                    <label>Product Url</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="form.productUrl"
                    />
                    <label>Product Category</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="form.category"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="editProduct()"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button @click="deleteProduct(project.productID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <div v-if="myProjects" class="row p-4"></div>
      <div v-else>Processing...</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SingleUpdateProductModal from "../components/Update-Product.vue";
export default {
  components: { SingleUpdateProductModal },
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
        const response = await axios.get(
          "https://fullstackeomp-0asf.onrender.com/products"
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    this.$store.dispatch("getmyProjects");
    this.resetForm();
    $("#exampleModal").modal("hide");
  } catch (error) {
    console.error("Error editing product:", error);
  }
},

    resetForm() {
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
      this.$store.dispatch("getmyProjects");
      this.resetForm();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  },
};
</script>
<style scoped>
.just {
  margin: auto;
}
img {
  width: 100px;
  height: 110px;
}
h1 {
  text-align: center;
}

form {
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
  display: flex;
  flex-direction: column;
}
.button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: rgb(183, 116, 183);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: auto;

}

button:hover {
  background-color: purple;
}
h2 {
  color: #0056b3;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: center;
  border-bottom: 4px solid #ddd;
}

@media screen and (max-width: 700px) {
  * {
    overflow: hidden;
  }
  input {
    width: 70%;
    font-size: 14px;
  }

  button {
    width: 40%;
    font-size: 16px;
  }

  form {
    padding: 20px;
  }
  

  h2 {
    font-size: 28px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  label {
    font-size: 12px;
    margin-top: 3px;
  }

  table {
    font-size: 10px;
  }

  th,
  td {
    padding: 5px;
  }

  img {
    width: 70px;
    height: 80px;
  }
  button{
    display: flex;
    flex-direction: column;
    width: 80px;
  }
  thead{
    display: none;
  }
}
</style>
