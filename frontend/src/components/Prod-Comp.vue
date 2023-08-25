<template>
  <div>
    <div class="text-center my-2">
      <div>
        <div>
          <label>Search by Product Name:</label>
          <input class="input" type="text" v-model="searchQuery" />
          <button @click="searchProducts">Search</button>
        </div>
        <label class="b">Filter by Category:</label>
        <label>Filter by Category:</label>
        <select v-model="selectedCategory">
          <option value="">All</option>
          <option
            v-for="category in uniqueCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <button class="btn" @click="sortProducts('asc')">
        Sort by Price (ASC)
      </button>
      <button class="btn" @click="sortProducts('desc')">
        Sort by Price (DESC)
      </button>
    </div>
    <div v-if="myProjects" class="row p-4">
      <div
        v-for="project in filteredProjects"
        :key="project.productID"
        class="card m-2 p-3"
        id="productTable"
      >
        <img
          :src="project.productUrl"
          class="card-img-top rounded rounded-2"
          style="width: 18rem"
          :alt="project.productName"
        />
        <div class="card-body">
          <h5 class="card-title">{{ project.productName }}</h5>
          <h6 class="card-text">{{ project.category }}</h6>
          <h6 class="card-text">R {{ project.productPrice }}.00</h6>
          <button class="btn btn-primary">
            <router-link
              :to="{ name: 'single', params: { productID: project.productID } }"
            class="todler">
              View Details
            </router-link>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Processing...</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    filteredProjects() {
      if (this.selectedCategory) {
        return this.myProjectsSorted.filter(
          (project) => project.category === this.selectedCategory
        );
      } else {
        return this.myProjectsSorted;
      }
    },
    myProjects() {
      return this.$store.state.myProjects || [];
    },
    uniqueCategories() {
      return [...new Set(this.myProjects.map((project) => project.category))];
    },
  },
  data() {
    return {
      selectedCategory: "",
      myProjectsSorted: [],
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("getmyProjects");
      this.myProjectsSorted = [...this.myProjects];
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  },
  methods: {
    searchProducts() {
      if (this.searchQuery.trim() === "") {
        this.myProjectsSorted = [...this.myProjects];
      } else {
        this.myProjectsSorted = this.myProjects.filter((project) =>
          project.productName
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      }
    },
    filterProjects() {
      if (this.selectedCategory) {
        return this.myProjectsSorted.filter(
          (project) => project.category === this.selectedCategory
        );
      } else {
        return this.myProjectsSorted;
      }
    },
    sortProducts(orderBy) {
      this.myProjectsSorted.sort((a, b) => {
        if (orderBy === "asc") {
          return a.productPrice - b.productPrice;
        } else if (orderBy === "desc") {
          return b.productPrice - a.productPrice;
        }
      });
    },
   
  },
};
</script>
<style scoped>
.todler {
  text-decoration: none;
}
.input {
  border: 2px solid;
  border-radius: 10px;
}

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
.card h5,
.card h6 {
  margin: auto;
}

button {
  margin-bottom: 2rem;
  margin-top: 4px;
  margin-left: 50px;
  border: 3px solid #f1b4e2;
  border-radius: 2rem;
  text-align: center;
  background-color: #f1b4e2;
  box-shadow: 2px 6px 4px 2px #ede1ea;
}

button:hover {
  background: #cb47b1;
}

@media (max-width: 700px) {
  * {
    overflow: hidden;
  }
  .card {
    width: 100%;
    margin: 20px;
    flex-direction: column;
    align-items: center;
    height: auto;
    border-top: transparent;
  }

  button {
    margin-bottom: 20px;
    margin-left: 0;
  }
}
</style>
