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
          Sucursal: {{actualBranch}}
          <button v-on:click="logout" class="btn btn-danger d-flex m-1">
            Cerrar sesión
          </button>
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
  import axios from "axios";
  import jwtDecode from "jwt-decode";

  export default {
    name: 'EmployeeView',
    components: {Car, Sale, Client},
    data: function () {
      return {
        employeeCode: jwtDecode(localStorage.getItem('token')).employeeCode,
        carView: true,
        clientView: false,
        saleView: false,
        actualBranch: ''
      }
    },
    methods: {
      logout: function() {
        localStorage.removeItem('token');
        this.$router.push({name: 'LogIn'});
      },
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
      },
      getActualBranch: function(){
        axios.get(
            `https://bda-project-d8ff.vercel.app/employees/${this.employeeCode}`,
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            }
        ).then((response) => {
          this.actualBranch = response.data.sucursal.nombre;
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    computed: {
      isAuthenticated: {
        get: function (){
          return this.$route.meta.requiresAuth;
        },
        set: function (){}
      }
    },
    created: function() {
      this.getActualBranch();
    }
  }
</script>

<style scoped>

</style>