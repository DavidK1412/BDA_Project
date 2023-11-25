<template>
  <div>
    <h1>Hola admin</h1>
  </div>
</template>

<script>
  export default {
    name: 'AdminView',
    computed: {
      isAuthenticated: {
        get: function (){
          return this.$route.meta.requiresAuth;
        },
        set: function (){}
      }
    }
  }
</script>

<style>

</style>