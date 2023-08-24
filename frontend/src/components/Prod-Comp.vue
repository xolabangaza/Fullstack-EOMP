<template>
<div>  
  <div class="container">
      <div class="row justify-content-between">

<router-link :to="'/single'">
  <div class="card my-3 rounded rounded-5" style="width: 18rem;" v-for="project in myProjects" :key="project.projectID">
          <img :src="project.productUrl" class="card-img-top rounded rounded-5" style="width: 17rem;" :alt="project.productName ">
          <div class="card-body">
            <h5 class="card-title">{{project.productName}}</h5>
            <p class="card-text">{{ project.productPrice}}</p>
             <p class="card-text">{{project.category }}</p>
          </div>
        </div>
</router-link>
      </div>
    </div>
</div>
</template>
<script>
import SingleVue from './Single.vue';
export default {
  name: "MyProjects",
  computed: {
    myProjects() {
      return this.$store.state.myProjects;
    },
  },
  mounted() {
    this.$store.dispatch("getmyProjects");
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
  background-color: rgb(230, 227, 230);
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