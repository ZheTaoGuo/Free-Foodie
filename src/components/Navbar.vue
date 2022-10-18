<template>
  <nav class="navbar navbar-expand-lg bg-white fixed-top shadow py-0">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="width: 130px">
        <img src="/img/logo_black2.png" alt="brandlogo" class="brand_logo" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="index">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onclick="promptLogin()">Menu</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onclick="promptLogin()">Contact</a>
          </li>
        </ul>

        <button
          type="button"
          class="btn-brand navbar-right-btn"
          onclick="promptLogin()"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Order History"
        >
          <i class="fa fa-list-ul"></i>
        </button>
        <button
          type="button"
          class="btn-brand navbar-right-btn"
          onclick="promptLogin()"
          data-toggle="tooltip"
          data-placement="bottom"
          title="My Cart"
          style="margin-right: 30px"
        >
          <i class="fa fa-shopping-cart fa-lg"></i>
        </button>
        <button
          type="button"
          class="btn btn-light btn-start"
          style="background-color: black; color: #f6d7d0"
          onclick="location.href = 'signup'"
        >
          Get Started
        </button>
      </div>
    </div>
  </nav>
</template>

<script></script>

<style scoped></style>
