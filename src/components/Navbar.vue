<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light" >
    <div class="container-fluid" style="background-color: #187bcd;">
      <a class="navbar-brand" href="/">
        <img src="../assets/fflogo.png" height="70px">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item mx-2">
            <a class="nav-link active" aria-current="page" href="/search" style="color:white">Recipes</a>
          </li>
          <li class="nav-item mx-2">
            <a class="nav-link active" href="/fridge" style="color:white">My Fridge</a>
          </li>
          <li class="nav-item mx-2">
            <a href="/shoppinglist" class="nav-link active" style="color:white">
              Shopping List
            </a>
          </li>
          <li class="nav-item mx-2">
            <a class="nav-link active" style="color:white" @click="$emit('checkLogin')" >Profile</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
</script>

<style scoped>
nav {
  margin: 0;
  padding: 0;
}
img{
  height: 75px!important;
}
.nav-item{
  font-size: larger;
  font-weight: 500;
}

.nav-link:hover{
  text-decoration: underline;
}
.bi:hover{
  box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
} 
a:hover{
  cursor:pointer;
}
</style>