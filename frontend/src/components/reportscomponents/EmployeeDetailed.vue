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
  name: 'EmployeeDetailed',
  components: { DataTable },
  data: function() {
    return {
      employees: [],
      columns: [
        { data: null, render: function (data, type, row, meta) {
          return meta.row + 1;
        }},
        { data: 'sucursal'},
        { data: 'cargo'},
        { data: 'nombre'},
        { data: 'cedula'},
        { data: 'salario'},
        { data: 'fechaingreso'},
        { data: 'fechanacimiento'}
      ]
    }
  },
  methods: {
    getClients: function () {
      axios.get(`https://bda-project-d8ff.vercel.app/special/employee-detailed/`)
        .then(response => {
          this.employees = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  mounted() {
    this.getClients();
  }
}
</script>

<template>
  <div class="table-responsive">
    <DataTable ref="table" :data="employees" :columns="columns" class="table table-striped table-bordered display"
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
        <th>Cargo</th>
        <th>Nombre</th>
        <th>Cedula</th>
        <th>Salario</th>
        <th>Fecha Ingreso</th>
        <th>Fecha Nacimiento</th>
      </tr>
      </thead>
    </DataTable>
  </div>
</template>

<style scoped>

</style>