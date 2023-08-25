<template>
  <div>
    <div v-if="product" class="product-detail row px-5 py-4">
      <div class="product-image col-12 col-sm-6 col-md-6">
        <img :src="product.productUrl" :alt="product.productName" />
      </div>
      <div class="product-info col-12 col-sm-6 col-md-6 mt-5">
        <h3>{{ product.productName }}</h3>
        <h4>Price: {{ product.productPrice }}</h4>
        <h5>Q: {{ product.productStock }}</h5>
        <h5>Category: {{ product.category }}</h5>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SingleProductView",
  computed: {
    ...mapState(["myProduct"]), 
    product() {
      return this.myProduct;
    },
  },
  methods: {
    ...mapActions(["fetchProductDetails"]), 
    async fetchProduct() {
      try {
        const productID = this.$route.params.productID;
        await this.fetchProductDetails(productID);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
  },
  async mounted() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
img {
  border: 2px solid;
  border-radius: 10px;
  height: 80vh;
  width: 32vw;
}
.product-detail {
  height: 100vh;
}




</style>