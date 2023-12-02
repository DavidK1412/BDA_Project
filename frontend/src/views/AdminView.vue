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
              <a v-on:click="loadBrandView" style="cursor:pointer;" class="nav-link" :class="{'active': brandView}">Marcas</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadCardAdminView" style="cursor:pointer;" class="nav-link" :class="{'active': carAdminView}">Autos</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadSalesAdminView" style="cursor:pointer;" class="nav-link" :class="{'active': SalesAdminView}">Ventas - Global</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadSaleView" style="cursor:pointer;" class="nav-link" :class="{'active': saleView}">Ventas</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadColorView" style="cursor:pointer;" class="nav-link" :class="{'active': colorView}">Colores</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadClientAdminView" style="cursor:pointer;" class="nav-link" :class="{'active': clientAdminView}">Clientes</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadEmployeeAdminView" style="cursor:pointer;" class="nav-link" :class="{'active': employeeAdminView}">Empleados</a>
            </li>
            <li class="nav-item">
              <a v-on:click="loadSpecialReportsView" style="cursor:pointer;" class="nav-link" :class="{'active': specialReportsView}">Reportes</a>
            </li>
          </ul>


        </div>
        Sucursal: {{actualBranch}}
        <button v-on:click="logout" class="btn btn-danger d-flex m-1">
          Cerrar sesión
        </button>
      </div>
    </nav>
    <brand-admin v-if="brandView"></brand-admin>
    <car-admin v-if="carAdminView"></car-admin>
    <sales-admin v-if="SalesAdminView"></sales-admin>
    <sale v-if="saleView"></sale>
    <color-admin v-if="colorView"></color-admin>
    <client-admin v-if="clientAdminView"></client-admin>
    <employee-admin v-if="employeeAdminView"></employee-admin>
    <special-reports v-if="specialReportsView"></special-reports>
  </div>
</template>

<script>
  import axios from "axios";
  import jwtDecode from "jwt-decode";
  import BrandAdmin from "../components/BrandAdmin.vue";
  import CarAdmin from "../components/CarAdmin.vue";
  import SalesAdmin from "../components/SalesAdmin.vue";
  import Sale from "../components/Sale.vue";
  import ColorAdmin from "../components/ColorAdmin.vue";
  import ClientAdmin from "../components/ClientAdmin.vue";
  import EmployeeAdmin from "../components/EmployeeAdmin.vue";
  import SpecialReports from "../components/SpecialReports.vue";

  export default {
    name: 'AdminView',
    components: {BrandAdmin, CarAdmin, SalesAdmin, Sale, ColorAdmin, ClientAdmin, EmployeeAdmin, SpecialReports},
    data: function () {
      return {
        employeeCode: jwtDecode(localStorage.getItem('token')).employeeCode,
        actualBranch: '',
        brandView: true,
        carAdminView: false,
        SalesAdminView: false,
        saleView: false,
        colorView: false,
        clientAdminView: false,
        employeeAdminView: false,
        specialReportsView: false
      }
    },
    methods: {
      loadBrandView: function() {
        this.brandView = true;
        this.carAdminView = false;
        this.SalesAdminView = false;
        this.saleView = false;
        this.colorView = false;
        this.clientAdminView = false;
        this.employeeAdminView = false;
        this.specialReportsView = false;
      },
      loadCardAdminView: function() {
        this.brandView = false;
        this.carAdminView = true;
        this.SalesAdminView = false;
        this.saleView = false;
        this.colorView = false;
        this.clientAdminView = false;
        this.employeeAdminView = false;
        this.specialReportsView = false;
      },
      loadSalesAdminView: function() {
        this.brandView = false;
        this.carAdminView = false;
        this.SalesAdminView = true;
        this.saleView = false;
        this.colorView = false;
        this.clientAdminView = false;
        this.employeeAdminView = false;
        this.specialReportsView = false;
      },
      loadSaleView: function() {
        this.brandView = false;
        this.carAdminView = false;
        this.SalesAdminView = false;
        this.saleView = true;
        this.colorView = false;
        this.clientAdminView = false;
        this.employeeAdminView = false;
        this.specialReportsView = false;
      },
      loadColorView: function() {
        this.brandView = false;
        this.carAdminView = false;
        this.SalesAdminView = false;
        this.saleView = false;
        this.colorView = true;
        this.clientAdminView = false;
        this.employeeAdminView = false;
        this.specialReportsView = false;
      },
      loadClientAdminView: function() {
        this.brandView = false;
        this.carAdminView = false;
        this.SalesAdminView = false;
        this.saleView = false;
        this.colorView = false;
        this.clientAdminView = true;
        this.employeeAdminView = false;
        this.specialReportsView = false;
      },
      loadEmployeeAdminView: function() {
        this.brandView = false;
        this.carAdminView = false;
        this.SalesAdminView = false;
        this.saleView = false;
        this.colorView = false;
        this.clientAdminView = false;
        this.employeeAdminView = true;
        this.specialReportsView = false;
      },
      loadSpecialReportsView: function() {
        this.brandView = false;
        this.carAdminView = false;
        this.SalesAdminView = false;
        this.saleView = false;
        this.colorView = false;
        this.clientAdminView = false;
        this.employeeAdminView = false;
        this.specialReportsView = true;
      },
      logout: function() {
        localStorage.removeItem('token');
        this.$router.push({name: 'LogIn'});
      },
      getActualBranch: function(){
        axios.get(
            `http://localhost:3000/employees/${this.employeeCode}`,
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
    created: function () {
      if (this.isAuthenticated) {
        this.getActualBranch();
      }
      this.loadSpecialReportsView();
    }
  }
</script>

<style>

</style>