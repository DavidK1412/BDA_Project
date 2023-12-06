<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import Select from 'datatables.net-select';

DataTable.use(DataTableLib);
DataTable.use(Buttons);
DataTable.use(Select);

export default {
  name: 'MostNewBrands',
  components: { DataTable },
  data: function () {
    return {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      results: [],
      columns: [
        { data: null, render: function (data, type, row, meta) {
            return meta.row + 1;
          }},
        { data: 'sucursal'},
        { data: 'marca'},
        { data: 'cantidad'}
      ]
    }
  },
  methods: {
    getMostSold: function () {
      axios.get(`http://localhost:3000/special/most-new-brands/${this.month}/${this.year}`)
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  mounted() {
    this.getMostSold();
  }
}

</script>

<template>
<div>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-3">
          <label for="month">Mes</label>
          <select class="form-select" v-model="month" id="month">
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
        <div class="col-3">
          <label for="year">Año</label>
          <input type="number" class="form-control" id="year" v-model="year">
        </div>
        <div class="col-3">
          <button class="btn btn-primary" @click="getMostSold">Consultar</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12">
      <DataTable ref="table" :data="results" :columns="columns" class="table table-striped table-bordered display"
                 :options="{
          select: true,
          responsive: true,
          dom: 'Bfrtip',
          autoWidth: false,
          language: {
            search: 'Buscar:',
            lengthMenu: 'Mostrar _MENU_ registros por página',
            zeroRecords: 'No se encontraron registros',
            info: 'Mostrando página _PAGE_ de _PAGES_',
            infoEmpty: 'No hay registros disponibles',
            infoFiltered: '(filtrado de _MAX_ registros totales)',
            paginate: {
              first: 'Primero',
              last: 'Último',
              next: 'Siguiente',
              previous: 'Anterior'
            }
          }
        }">
        <thead>
        <tr>
          <th>#</th>
          <th>Sucursal</th>
          <th>Marca</th>
          <th>Cantidad</th>
        </tr>
        </thead>
      </DataTable>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>