<template>
    <div class="content" style = "margin-top: 80px;">
    <div class="container">
      <div class="row align-items-stretch no-gutters contact-wrap">
        <div class="col-md-12">
          <div class="form h-100">
            <h1 class="display-5 mb-3 section-titles">Sign Up</h1>
            <form>

              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingName" placeholder="name@example.com">
                <label for="floatingName">Name</label>
              </div>

              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
                <label for="floatingEmail">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingRepeatPassword" placeholder="Password">
                <label for="floatingRepeatPassword">Repeat Password</label>
              </div>
<!--              <div class="form-check mb-3">-->
<!--                <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">-->
<!--                <label class="form-check-label" for="rememberPasswordCheck">-->
<!--                  Remember password-->
<!--                </label>-->
<!--              </div>-->
              <div class="d-grid">
                <button class="btn btn-brand btn-login text-uppercase fw-bold signin-btn" type="submit">Create
                  Account</button>
                </div>
                <hr class="my-4">
              
              <div class="form-group">
                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
              </div>
                

                

      
                <div class="d-grid" style="align-items: center;"> 
                  <a href="login" class="btn btn-link forgotpw-btn" style = "margin-top: 20px;">
                      Have An Account? Sign In
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
function promptLogin() {
      Swal.fire({
        icon: "warning",
        title: "Log in to access this page",
        text: 'or sign up for free with us',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Login',
        denyButtonText: `Sign Up`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.replace("http://localhost:8080/login")
        } else if (result.isDenied) {
          window.location.replace("http://localhost:8080/signup")
        }
      })
    }
</script>

<style scoped>

</style>