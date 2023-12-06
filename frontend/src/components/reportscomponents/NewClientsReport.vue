<script>
import axios from "axios";

export default {
  name: 'NewClientsReport',
  data: function (){
    return {
      newClientsNumber: 0,
      mes:  new Date().getMonth() + 1,
      anio: new Date().getFullYear(),
    }
  },
  methods: {
    getNewClientsNumber: function () {
      axios.get(`http://localhost:3000/special/new-clients/${this.mes}/${this.anio}`)
          .then(response => {
            console.log(response.data);
            this.newClientsNumber = response.data[0].consolidado_clientes_nuevos;
          })
          .catch(error => {
            console.log(error);
          })
    }
  },
  created: function () {
    this.getNewClientsNumber();
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <label for="mes">Mes</label>
        <select class="form-control" id="mes" v-model="mes">
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="anio">Año</label>
        <input type="number" class="form-control" id="anio" v-model="anio">
      </div>
      <div class="col-md-4">
        <button class="btn btn-primary" @click="getNewClientsNumber">Consultar</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h2>Número de nuevos clientes: {{newClientsNumber}}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>