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
            <a class="nav-link active" aria-current="page" href="/search">Recipes</a>
          </li>
          <li class="nav-item mx-2">
              <a class="nav-link active" href="/fridge">My Fridge</a>
          </li>
          <li class="nav-item mx-2">
            <a href="/shoppinglist" class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
              </a>
          </li>
          <li class="nav-item mx-2">
            <a href="/profile" class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'appNavbar',
  // props: {
    //   msg: String
    // }
  }
</script>

<style scoped>
nav {
   margin: 0;
   padding: 0;
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



</style>