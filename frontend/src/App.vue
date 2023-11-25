<template>
  <router-view
    v-on:loadEmployeeView="loadEmployeeView"
    v-on:loadAdminView="loadAdminView"
    v-on:logOut="logOut"
  />
</template>

<script>
  export default {
    name: 'App',
    computed: {
      isAuthenticated: {
        get: function(){
          return this.$route.meta.requiresAuth;
        },
        set: function(){}
      }
    },
    methods: {
      logOut: function() {
        console.log('TODO: logOut');
      },
      loadEmployeeView: function() {
        console.log('TODO: loadEmployeeView');
      },
      loadAdminView: function() {
        console.log('TODO: loadAdminView');
      }
    },
    created: function() {
      if (this.isAuthenticated) {
        console.log('TODO: Load views based in token data')
      } else {
        this.$router.push({name: 'LogIn'});
      }
    }
  }

</script>

<style scoped>

</style>
