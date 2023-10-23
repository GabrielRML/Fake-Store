<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="color: white;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Fake Store</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/produtos" class="nav-link" aria-current="page">Products</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>

.main {
  max-width: 1400px;
  margin: auto;
}

</style>
