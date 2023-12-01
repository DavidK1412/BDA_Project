<template>
  <div>
    <h1 class="text-center">Mis ventas</h1>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Admin. Clientes - Crear</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="this.newDealData.id_cliente" type="text" class="form-control" placeholder="Cedula Cliente" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <select v-model="newDealData.id_auto" class="form-select mb-3">
              <option selected>Selecciona automotor</option>
              <option v-for="car in cars" :value="car.id">{{car.marca}} {{car.linea}} {{car.modelo}} - {{car.chasis}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button"
                    v-on:click="this.newDealData = {
          id: '',
          fecha: '',
          id_cliente: '',
          id_auto: '',
          id_empleado: '',
        }"
                    class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" v-on:click="addDeal" class="btn btn-success">Crear</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <DataTable ref="table" :data="sales" :columns="colums" class="table table-striped table-bordered display"
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
          </tr>
          </thead>
        </DataTable>
        <button v-on:click="filterCars" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Generar venta
        </button>
      </div>
    </div>
  </div>
</template>

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
    name: 'Sale',
    components: {DataTable},
    data: function () {
      return {
        newDealData: {
          id: '',
          fecha: '',
          id_cliente: '',
          id_auto: '',
          id_empleado: '',
        },
        actualBranch: '',
        employeeCode: jwtDecode(localStorage.getItem('token')).employeeCode,
        sales: [],
        cars: [],
        colums: [
          {data: null, render: function (data, type, row, meta) {
            return meta.row + 1;
          }},
          {data: "fecha"}, // Obtiene la fecha de la venta, unicamente AAAA-MM-DD 2023-08-16T05:00:00.000Z
          {data: 'cliente.nombre'},
          {data: 'detailedAuto'},
          {data: 'auto.chasis'},
          {data: 'auto.valor'}
        ]
      }
    },
    methods: {
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
      },
      getSalesByEmployee: function(){
        axios.get(
          `http://localhost:3000/sales/empleado/${this.employeeCode}`,
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
        ).then((response) => {
          this.sales = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getCars: function () {
         axios.get(
          'http://localhost:3000/autos',
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
        ).then((response) => {
          this.cars = response.data;
          console.log(this.cars);
        }).catch((error) => {
          console.log(error);
        });
      },
      filterCars:  function (){
        console.log(this.cars)
        this.cars = this.cars.filter(car => car.sucursal === this.actualBranch);
      },
      addDeal: function (){
        this.newDealData.id = crypto.randomUUID();
        this.newDealData.id_empleado = this.employeeCode;
        this.newDealData.fecha = new Date().toISOString().slice(0, 10);
        axios.post(
          'http://localhost:3000/sales',
          this.newDealData,
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
        ).then((response) => {
          if(response.status === 200){
            alert("Venta creada correctamente!");
            this.getSalesByEmployee();
          } else{
            alert("Error al crear venta")
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    mounted() {
      this.getSalesByEmployee();
      this.getActualBranch();
      this.getCars();
    }
  }
</script>

<style scoped>

</style>