<template>
    <div>
      <div v-if="myProjects" class=" row p-4">
        <myProjectComp
          
        />
        <router-link :to="`/products/${product.projectID}`">View Details</router-link>
      </div>
      <div v-else>Processing...</div>
    </div>
  </template>
  <script>
  import myProjectComp from "@/components/Prod-Comp.vue";
  export default {
    computed: {
      myProjects() {
        return this.$store.state.myProjects;
      },
      computed: {
    ...mapState(["myProjects"]), // Map the myProjects state to the component
    products() {
      return this.myProjects || []; // Use a fallback in case myProjects is not yet fetched
    },
  },
    },
    mounted() {
      this.$store.dispatch("getmyProjects");
    },
    components: { myProjectComp },
  };
  </script>
  <style></style>
