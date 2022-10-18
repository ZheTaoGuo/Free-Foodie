<template>
    <div class="content" style = "margin-top: 80px;">
    <div class="container">
      <div class="row align-items-stretch no-gutters contact-wrap">
        <div class="col-md-12">
          <div class="form h-100">
            <h1 class="display-5 mb-3 section-titles">Sign In</h1>
            <form action = "#" th:action="@{/login}" th:object="${user}" method="post">
              <!-- !!! -->
              <div class="form-floating mb-3">
                <input type="email" th:field="*{username}" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" th:field="*{password}"  class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                <label class="form-check-label" for="rememberPasswordCheck">
                  Remember password
                </label>
              </div>
              <div class="d-grid" >
                <button class="btn btn-brand btn-login text-uppercase fw-bold signin-btn" type="submit">Sign
                  in</button>
                </div>
                <hr class="my-4">
                <div class="d-grid mb-2">
                  <button class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                    <i class="fa fa-google me-2"></i> Sign in with Google
                  </button>
                </div>
                <div class="d-grid">
                  <button class="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                    <i class="fa fa-facebook me-2"></i> Sign in with Facebook
                  </button>
                </div>

                <div class="d-grid" style="align-items: center;"> 
                  <a href="signup" class="btn btn-link forgotpw-btn" style = "margin-top: 20px;">
                      Don't Have An Account? Sign Up
                  </a>
                </div>
              </form>
              
          </div>
        </div>
      </div>
    </div>
  
  
  </div>

</template>

<script>
  //  function promptLogin() {
  //   console.log("hello")
  //   //   Swal.fire({
  //   //     icon: "warning",
  //   //     title: "Log in to access this page",
  //   //     text: 'or sign up for free with us',
  //   //     showDenyButton: true,
  //   //     showCancelButton: true,
  //   //     confirmButtonText: 'Login',
  //   //     denyButtonText: `Sign Up`,
  //   //   }).then((result) => {
  //   //     /* Read more about isConfirmed, isDenied below */
  //   //     if (result.isConfirmed) {
  //   //       window.location.replace("http://localhost:8080/login")
  //   //     } else if (result.isDenied) {
  //   //       window.location.replace("http://localhost:8080/signup")
  //   //     }
  //   //   })
  //    }
</script>

<style scoped>

</style>
