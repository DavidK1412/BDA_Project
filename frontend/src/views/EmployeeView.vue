<template>
  <div>
    <h1>Hola empleado</h1>
  </div>
</template>

<script>
  export default {
    name: 'EmployeeView',
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

<style scoped>

</style>