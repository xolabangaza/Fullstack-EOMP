<template>
  <div>
    <div v-if="project"> 
      <button
        @click="populateForm(project)"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Edit
      </button>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
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
              <div>
                <div>
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
                        <td>
                          <button @click="populateForm(product)">Edit</button>
                        </td>
                      </div>
                    </tr>
                  </table>
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
                  </div>
                </div>
              </div>
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
                @click="editProduct()"
                class="btn btn-primary"
              >
                Update
              </button>
              <button @click="editProduct()">Edit Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";


export default {
   name: "SingleUpdateProduct",
  computed: {
    myProduct() {
      return this.$store.state.myProduct;
    },
  },
  mounted() {
    this.$store.dispatch("fetchProductDetails");
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
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
    populateForm(product) {
      this.form.productID = product.productID;
      this.form.productName = product.productName;
      this.form.productPrice = product.productPrice;
      this.form.productStock = product.productStock;
      this.form.productUrl = product.productUrl;
      this.form.category = product.category;
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
      $("#staticBackdrop").modal("hide"); 
    } catch (error) {
      console.error("Error editing product:", error);
    }
  },
};


</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
