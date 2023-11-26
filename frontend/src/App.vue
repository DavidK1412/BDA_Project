<template>
  <router-view
    v-on:loadEmployeeView="loadEmployeeView"
    v-on:loadAdminView="loadAdminView"
    v-on:logOut="logOut"
  />
</template>

<script>
  import jwtDecode from "jwt-decode";
  export default {
    name: 'App',
    computed: {
      isAuthenticated: {
        get: function (){
          if (localStorage.getItem('token')) {
            return true;
          } else {
            return false;
          }
        },
        set: function (){}
      }
    },
    methods: {
      logOut: function() {
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        this.$router.push({name: 'LogIn'});
      },
      loadEmployeeView: function() {
        this.isAuthenticated = true;
        this.$router.push({name: 'EmployeeView'});
      },
      loadAdminView: function() {
        this.isAuthenticated = true;
        this.$router.push({name: 'AdminView'});
      }
    },
    created: function() {
      if (this.isAuthenticated) {
        const token = localStorage.getItem('token');
        const tokenData = jwtDecode(token);
        if (tokenData.role === 1) {
          this.$router.push({name: 'AdminView'});
        } else {
          this.$router.push({name: 'EmployeeView'});
        }
      } else {
        this.$router.push({name: 'LogIn'});
      }
    }
  }

</script>

<style scoped>

</style>
