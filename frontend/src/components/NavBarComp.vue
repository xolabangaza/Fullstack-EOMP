<template>
    
 <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">Serve-Style</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Shop</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
         <li class="nav-item">
          <router-link class="nav-link" to="/contact">Contact</router-link>
        </li>
         <li class="nav-item">
         <router-link class="nav-link" to="/admin">Admin</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .navbar {
      background-color:black!important;
      color: white !important;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;
      overflow: none;
      
    }
    .nav-link{
      color: white;
    }

    .navbar-brand {
      color: white;
      font-size: 40px;
      font-weight:400;
      font-style: italic;
    }

    .nav-item {
      margin: 0;
      padding: 0;
      display: flex;
      margin-left: 100px;
      font-size: 1.4rem;
      color: white;
    }
    .nav-item :hover{
      background-color: rgb(204, 186, 202);
      border: 2px dotted;
      border-radius: 10px;
    }



    @media (max-width: 300px) {
  .navbar {
    flex-direction: column;
    height: auto;
    padding: 0 10px;
  }

  .navbar-logo {
    margin-bottom: 10px;
  }

  .navbar-menu li {
    margin: 5px 0;
  }

  .navbar-menu li a {
    font-size: 14px;
    padding: 6px;
  }
}
    </style>