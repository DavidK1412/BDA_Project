<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="../assets/car-flatline.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
          BuenAuto
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a v-on:click="loadCarView" style="cursor:pointer;" class="nav-link" :class="{'active': carView}">Autos</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadClientView" style="cursor:pointer;" class="nav-link" :class="{'active': clientView}">Clientes</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadSaleView" style="cursor:pointer;" class="nav-link" :class="{'active': saleView}">Ventas</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <car v-if="carView"></car>
    <client v-if="clientView"></client>
    <sale v-if="saleView"></sale>
  </div>
</template>

<script>
  import Car from "../components/Car.vue";
  import Client from "../components/Client.vue";
  import Sale from "../components/Sale.vue";

  export default {
    name: 'EmployeeView',
    components: {Car, Sale, Client},
    data: function () {
      return {
        carView: true,
        clientView: false,
        saleView: false
      }
    },
    methods: {
      loadCarView: function() {
        this.carView = true;
        this.clientView = false;
        this.saleView = false;
      },
      loadClientView: function() {
        this.carView = false;
        this.clientView = true;
        this.saleView = false;
      },
      loadSaleView: function() {
        this.carView = false;
        this.clientView = false;
        this.saleView = true;
      }

    },
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