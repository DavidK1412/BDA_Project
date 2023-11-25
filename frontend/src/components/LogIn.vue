<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <!----------------------- Login Container -------------------------->
    <div class="row border rounded-5 p-3 bg-white shadow box-area">
      <!--------------------------- Left Box ----------------------------->
      <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style="background: #103cbe;">
        <div class="featured-image mb-3">
          <img src="../assets/road-trip-monochromatic-d57b9.png" class="img-fluid" style="width: 250px;">
        </div>
        <p class="text-white fs-2" style="font-family: 'Courier New', Courier, monospace; font-weight: 600;">Buen Auto 🚗</p>
        <small class="text-white text-wrap text-center" style="width: 17rem;font-family: 'Courier New', Courier, monospace;">El auto de tu sueños ❤️.</small>
      </div>
      <!-------------------- ------ Right Box ---------------------------->

      <div class="col-md-6 right-box">
        <div class="row align-items-center">
          <div class="header-text mb-4">
            <h2>Bienvenido!</h2>
            <p>Inicia sesión para continuar!</p>
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control form-control-lg bg-light fs-6" placeholder="Email address">
          </div>
          <div class="input-group mb-1">
            <input type="password" class="form-control form-control-lg bg-light fs-6" placeholder="Password">
          </div>
          <div class="input-group mb-3">
            <button class="btn btn-lg btn-primary w-100 fs-6">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LogIn',
    computed: {
      isAuthenticated: {
        get: function (){
          return this.$route.meta.requiresAuth;
        },
        set: function (){}
      }
    },
    methods: {
      logIn: function (){

      }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
body{
  font-family: 'Poppins', sans-serif;
  background: #ececec;
}
/*------------ Login container ------------*/
.box-area{
  width: 930px;
}
/*------------ Right box ------------*/
.right-box{
  padding: 40px 30px 40px 40px;
}
/*------------ Custom Placeholder ------------*/
::placeholder{
  font-size: 16px;
}
.rounded-4{
  border-radius: 20px;
}
.rounded-5{
  border-radius: 30px;
}
/*------------ For small screens------------*/
@media only screen and (max-width: 768px){
  .box-area{
    margin: 0 10px;
  }
  .left-box{
    height: 100px;
    overflow: hidden;
  }
  .right-box{
    padding: 20px;
  }
}
</style>