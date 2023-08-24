import { createStore } from 'vuex'
import axios from 'axios'
const dbConnection = "https://fullstackeomp-0asf.onrender.com/";

export default createStore({
  state: {
    myProjects: null,
    myProduct: null,
    myAdmins: null,
  },
  mutations: {
    setmyProjects: (state, myProjects) => {
      state.myProjects = myProjects;
    },
    //Single product
    setmyProduct: (state, myProduct) => {
      state.myProduct = myProduct;
    },
    setmyAdmins: (state, myAdmins) => {
      state.myAdmins = myAdmins;
    },
  },
  actions: {
    async getmyProjects(context) {
      try {
        const response = await axios.get("https://fullstackeomp-0asf.onrender.com/products");
        context.commit("setmyProjects", response.data);
                // fetch("http://localhost:3000/users")
                //   .then((res) => res.json())
                //   .then((data) => context.commit("setmyProjects", data.myProjects));
              // },
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    async fetchProductDetails(context, productID) {
      try {
        const response = await axios.get(
          `https://fullstackeomp-0asf.onrender.com/products/${productID}`
        );
        context.commit("setmyProduct", response.data);
        return response.data; // Return the fetched product details
      } catch (error) {
        console.error("Error fetching product details:", error);
        throw error; // Rethrow the error to the component
      }
    },
    async getmyAdmins(context) {
      try {
        const response = await axios.get("https://fullstackeomp-0asf.onrender.com/products");
        context.commit("setmyAdmins", response.data);
                // fetch("http://localhost:3000/users")
                //   .then((res) => res.json())
                //   .then((data) => context.commit("setmyAdmins", data.myAdmins));
              // },
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  }
});









