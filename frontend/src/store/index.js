import { createStore } from 'vuex'
import axios from 'axios'
const dbConnection = "https://fullstackeomp-0asf.onrender.com";

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
        const response = await axios.get(`${dbConnection}/products`);
        context.commit("setmyProjects", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    async fetchProductDetails(context, productID) {
      try {
        const response = await axios.get(
          `${dbConnection}/products/${productID}`
        );
        context.commit("setmyProduct", response.data);
        return response.data; 
      } catch (error) {
        console.error("Error fetching product details:", error);
        throw error; 
      }
    },
    async getmyAdmins(context) {
      try {
        const response = await axios.get(`${dbConnection}/products`);
        context.commit("setmyAdmins", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  }
});