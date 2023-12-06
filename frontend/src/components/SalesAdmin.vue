<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
import DataTable from "datatables.net-vue3";
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import Select from 'datatables.net-select';

DataTable.use(DataTableLib);
DataTable.use(Buttons);
DataTable.use(Select);

export default {
  name: 'SalesAdmin',
  components: { DataTable },
  data: function (){
    return {
      actualBranchId: jwtDecode(localStorage.getItem('token')).branchId,
      sales: [],
      columns: [
        { data: null, render: function (data, type, row, meta) {
          return meta.row + 1;
        }},
        { data: 'fecha' },
        { data: 'cliente.nombre' },
        { data: 'detailedAuto'},
        { data: 'auto.chasis' },
        { data: 'auto.valor' },
        { data: 'vendedor.nombre' },
      ]
    }
  },
  methods: {
    getSalesByBranch: function (){
      axios.get(
        `https://bda-project-d8ff.vercel.app/sales/sucursal/${this.actualBranchId}`,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then((response) => {
        this.sales = response.data;
        console.log(this.sales)
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getSalesByBranch();
  }
}
</script>

<template>
  <div>
    <h1 class="text-center">Ventas en este concesionario</h1>
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <DataTable ref="table" :data="sales" :columns="columns" class="table table-striped table-bordered display"
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
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Auto</th>
            <th>Chasis</th>
            <th>Valor</th>
            <th>Vendedor</th>
          </tr>
          </thead>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>