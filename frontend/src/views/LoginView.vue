<template>
  <div class="login">
<section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
          alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p class="lead fw-normal mb-0 me-3 text-white">Login</p>

          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center text-white fw-bold mx-3 mb-0">Enter Username And Password</p>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input v-model="username" type="text" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid username" />
            <!-- <label class="form-label" for="form3Example3">Email address</label> -->
          </div>
          <!-- Password input -->
          <div class="form-outline mb-3">
            <input v-model="password" type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" />
            <!-- <label class="form-label" for="form3Example4">Password</label> -->
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button v-on:click="checkusernameandpassword" type="button" class="btn btn-red btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>

          </div>

        </form>
      </div>
    </div>
  </div>

</section>
  </div>
</template>
<script>
export default {
    beforeCreate(){
    if(this.$store.getters.user['access']){
      this.$router.replace({ path: '/' })
    }
  },
  data() {
    return {
      username:'',
      password:''
    }
  },
  methods:{
    checkusernameandpassword: function(event){
      if(this.username && this.password){
        //dispach action
        this.$store.dispatch({
                  type: 'checkusernameeandpass',
                  username: this.username,
                  password: this.password
              })
      }else{
      alert('username or pass is empty')
      
      }

    }
  }
}
</script>

<style scoped>
.btn-red{

    color: white;
    background: #FC5404;
    border-left-color: #FC5404
}
.btn-red:hover{

    color: rgb(17, 15, 15);
    background: #d34605;
    border-left-color: #d34605
}
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}

</style>

