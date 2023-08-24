<template>
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
            <td><button @click="populateForm(project)">Edit</button></td>

            <td>
              <button @click="deleteProduct(project.productID)">Delete</button>
            </td>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// export default {
//   name: 'HelloWorld',
//   props: {
//     msg: String,
//   },
//   data() {
//     return {
//       form: {
//         productName: '',
//         productPrice: '',
//         productStock: '',
//         productUrl: '',
//         category: '',
//       },
//     };
//   },
//   methods: {
//     async submit() {
//       try {
//         await axios.post('http://localhost:5000/productsAdd', this.form);
//         alert('Product submitted successfully');
//         console.log('Product submitted successfully');
//         console.log()
//         this.resetForm(form);
//       } catch (error) {
//         console.error('Error submitting product:', error);
//       }
//     },
//     resetForm() {
//       this.form.productName = '';
//       this.form.productPrice = '';
//       this.form.productStock = '';
//       this.form.productUrl = '';
//       this.form.category = '';
//     },
//   },
export default {
  computed: {
    myProjects() {
      return this.$store.state.myProjects;
    },
  },
  mounted() {
    this.$store.dispatch("getmyProjects");
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
          await axios.put(
            `https://fullstackeomp-0asf.onrender.com/${this.form.productID}`,
            {
              productName: this.form.productName,
              productPrice: this.form.productPrice,
              productStock: this.form.productStock,
              productUrl: this.form.productUrl,
              category: this.form.category,
            }
          );
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
          `https://fullstackeomp-0asf.onrender.com/${productID}`
        );
        alert("Product deleted successfully");
        this.$store.dispatch("getmyProjects");
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
        `https://fullstackeomp-0asf.onrender.com/${this.form.productID}`,
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





// import axios from "axios";
// export default {
//   computed: {
//     myProjects() {
//       return this.$store.state.myProjects;
//     },
//   },
//   mounted() {
//     this.$store.dispatch("getmyProjects");
//   },
//   name: "HelloWorld",
//   props: {
//     msg: String,
//   },
//   data() {
//     return {
//       form: {
//         productName: "",
//         productPrice: "",
//         productStock: "",
//         productUrl: "",
//         category: "",
//       },
//     };
//   },
//   methods: {
//     async fetchProducts() {
//       try {
//         axios
//           .get("https://fullstackeomp-0asf.onrender.com/products/:id")
//           .then(function (response) {
//             const products = response.data;

//             const table = document.getElementById("productTable");
//             products.forEach(function (product) {
//               const row = table.insertRow();
//               row.insertCell(1).textContent = product.productName;
//               row.insertCell(2).textContent =
//                 "$" + product.productPrice.toFixed(2);
//               row.insertCell(3).textContent = product.productStock;
//               row.insertCell(4).textContent = product.productUrl;
//               row.insertCell(5).textContent = product.category;
//             });
//           })
//           .catch(function (error) {
//             console.error("Error fetching products:", error);
//           });
//         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         const response = await axios.get("https://fullstackeomp-0asf.onrender.com/products");
//         this.products = response.data;
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     },
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     async submit() {
//       try {
//         await axios.post(`https://fullstackeomp-0asf.onrender.com/productsAdd`, {
//           productName: this.form.productName,
//           productPrice: this.form.productPrice,
//           productStock: this.form.productStock,
//           productUrl: this.form.productUrl,
//           category: this.form.category,
//         });
//         alert("Product updated successfully");
//         console.log("Product updated successfully");
//         this.resetForm(); // Call the resetForm() method to clear the form
//         window.location.reload();
//       } catch (error) {
//         console.error("Error updating product:", error);
//       }
//     },
//     resetForm() {
//       // Reset the form after successful update
//       this.form.productName = "";
//       this.form.productPrice = "";
//       this.form.productStock = "";
//       this.form.productUrl = "";
//       this.form.category = "";
//     },
//     populateForm(product) {
//       this.form.productName = product.productName;
//       this.form.productPrice = product.productPrice;
//       this.form.productStock = product.productStock;
//       this.form.productUrl = product.productUrl;
//       this.form.category = product.category;
//     },
//     async deleteProduct(productID) {
//       try {
//         const response = await axios.delete(
//           `https://fullstackeomp-0asf.onrender.com/${productID}`
//         );
//         alert("Product deleted successfully");
//         this.$store.dispatch("getmyProjects");
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     },
//   },
// };
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
