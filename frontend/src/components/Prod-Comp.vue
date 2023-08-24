<template>
  <div>
    <div v-if="myProjects" class="row p-4">
      <div v-for="product in products" :key="product.projectID" class="card my-1 rounded rounded-2 mb-3" style="width: 19rem; height: 30rem">
        <img :src="product.productUrl" class="card-img-top rounded rounded-2" style="width: 18rem;" :alt="product.productName">
        <div class="card-body">
          <h5 class="card-title">{{ product.productName }}</h5>
          <h6 class="card-text">{{ product.category }}</h6>
          <h6 class="card-tex">R {{ product.productPrice }}.00</h6>
          <button><router-link :to="`/${product.projectID}`">View Details</router-link></button>
        </div>
      </div>
    </div>
    <div v-else>Processing...</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["myProjects"]), 
    products() {
      return this.myProjects || []; 
    },
  },
  mounted() {
    this.$store.dispatch("getmyProjects");
  },
};
</script>
<style scoped>

p {
  color: black;
}
.card {
  display: flex;
  width: 20rem;
  height: 33rem;
  background-color: white;
  margin-left: 40px;
}
.card h5, .card h6{
  margin: auto;
}

button {
  margin-bottom: 10rem;
  margin-top: 4px;
  margin-left: 50px;
  border: 3px solid  #f1b4e2;
  border-radius: 2rem ;
  text-align: center;
  background-color: #f1b4e2;
  box-shadow: 2px 6px 4px 2px  #ede1ea;
  }

button:hover{
  background: #cb47b1;
}

</style>