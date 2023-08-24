<template>
  <div>
    <div v-if="product" class="product-details">
      <div class="product-image">
        <img :src="product.productUrl" :alt="product.productName" />
      </div>
      <div class="product-info">
        <h3>{{ product.productName }}</h3>
        <p>Price: {{ product.productPrice }}</p>
        <p>Stock: {{ product.productStock }}</p>
        <p>Category: {{ product.category }}</p>
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
    ...mapState(["myProduct"]), // Map the myProduct state to the component
    product() {
      return this.myProduct;
    },
  },
  methods: {
    ...mapActions(["fetchProductDetails"]), // Map the action to the component
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
p {
  color: #CBE4DE;
}
.card {
  display: flex;
  width: 20rem;
  background-color: rgb(209, 193, 209);
}
.card h4, .card p{
  margin: auto;
}
 
.btns{
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.btn a{
    text-decoration: none;
}

.btn{
   background-color:blueviolet;
    border-radius: 0.5rem;
    width: 6rem;
    height: 2rem;
    padding: 0.5rem;
} 


/*///////////////////////////////////////////*/
.cardStyle {
  border-radius: 0.5rem;
}
button {
  margin-top: 0.8rem;
  margin-left: 0.8rem;
  border-radius: 2rem;
  text-align: center;
  background-color: #CBE4DE;
}
.animate__animated.animate__flash {
  color: #2E4F4F;
  background-color: #CBE4DE;
  --animate-duration: 10s;
}
@media screen and(max-width: 300px) {
  .animate__animated.animate__flash {
    animation-play-state: paused;
  }
}
.animate__animated.animate__flash:hover {
  color: #2E4F4F;
}
.cardStyle {
  background-color: #2E4F4F;
  height: 25rem;
}
#con2 p {
  visibility: hidden;
}
p {
  font-size: larger;
  text-decoration: none !important;
  color: #CBE4DE;
  visibility: hidden;
}
.tags {
  visibility: hidden;
}
#con2:hover {
  height: 100%;
  width: 100%;
  visibility: hidden;
}
#con2:hover {
  visibility: visible;
}
#con2:hover button {
  visibility: visible;
}
#con2:hover .tags {
  visibility: visible;
}
#con2:hover p {
  visibility: visible;
}
#con2:hover a {
  visibility: visible;
}
.img {
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  width: 100%;
  height: 15rem;
}
</style>