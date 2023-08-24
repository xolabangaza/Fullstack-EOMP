<template>
  <div>
    <div v-if="myProjects" class=" row p-4">
      <myProdComp/>
      <router-link to="products/productID">View Details</router-link>
    </div>
    <div v-else>Processing...</div>
  </div>
</template>
<script>
import myProdComp from "@/components/Prod-Comp.vue";
export default {
  computed: {
    myProjects() {
      return this.$store.state.myProjects;
    },
    products() {
      return this.myProjects || [];
    },
  },
  mounted() {
    this.$store.dispatch("getmyProjects");
  },
  components: { myProdComp },
};
</script>
<style></style>