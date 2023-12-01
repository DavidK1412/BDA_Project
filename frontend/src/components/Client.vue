<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import Select from 'datatables.net-select'

DataTable.use(DataTableLib);
DataTable.use(Buttons);
DataTable.use(Select);
  export default {
    name: 'Client',
    components: {DataTable},
    data: function () {
      return {
        newClientDetail: {
          cedula: '',
          nombre: '',
          id_ciudad: '',
          telefonos: []
        },
        cities: [],
        newCellphone: '',
        searchId: '',
        founded: false,
        clientDetailData: {},
        clients: [],
        columns : [
          {data: null, render: function (data, type, row, meta) {
            return meta.row + 1;
          }},
          {data: 'cedula'},
          {data: 'nombre'}
        ]
      }
    },
    methods: {
      getCities: function () {
        axios.get('http://localhost:3000/cities')
            .then(response => {
              this.cities = response.data;
            }).catch(error => {
          console.log(error);
        })
      },
      getClients: function () {
        axios.get('http://localhost:3000/clients')
            .then(response => {
              this.clients = response.data;
            })
            .catch(error => {
              console.log(error);
            })
      },
      getDetailedClient: function (){
        const clientId = this.searchId;
        axios.get(`http://localhost:3000/clients/${clientId}`)
            .then(response => {
              this.clientDetailData = response.data;
              this.founded = true;
            }).catch(error => {
          console.log(error);
        })
      },
      addClientCellphone: function (){
        const clientId = this.clientDetailData.cedula;
        axios.post(`http://localhost:3000/clients/${clientId}/cellphone`,
            {
              "telefono": this.newCellphone
            }
        ).then(response => {
          if(response.status === 200){
            alert("Telefono añadido correctamente!");
            this.getDetailedClient();
          } else{
            alert("Error al añadir telefono al cliente")
          }
        })
      },
      addClient: function() {
        axios.post('http://localhost:3000/clients',
            {
              "cedula": this.newClientDetail.cedula,
              "nombre": this.newClientDetail.nombre,
              "id_ciudad": this.newClientDetail.id_ciudad,
              "telefonos": this.newClientDetail.telefonos
            }
        ).then(response => {
          if(response.status === 200){
            alert("Cliente creado correctamente!");
            this.getClients();
            this.newClientDetail = {
              cedula: '',
              nombre: '',
              id_ciudad: '',
              telefonos: []
            };
          } else{
            alert("Error al crear cliente")
          }
        }).then(() => {
          this.getClients();
        })

      }
    },
    mounted() {
      this.getClients();
      this.getCities();
    }
  }
</script>

<template>
  <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Admin. Clientes</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">@</span>
              <input v-model="searchId" type="text" class="form-control" placeholder="No. Documento" aria-label="Username" aria-describedby="addon-wrapping">
              <button v-on:click="getDetailedClient" type="button" class="btn btn-primary">Buscar</button>
            </div>
            <div v-if="founded">
              <h3 class="text-center">Detalles cliente</h3>
              <table class="table">
                <tr>
                  <th scope="col">Cedula</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Sucursal</th>
                </tr>
                <tr>
                  <td>{{this.clientDetailData.cedula}}</td>
                  <td>{{this.clientDetailData.nombre}}</td>
                  <td>{{this.clientDetailData.ciudad.nombre}}</td>
                  <td v-if="this.clientDetailData.id_sucursal !== null">{{this.clientDetailData.sucursal}}</td>
                </tr>
              </table>
              <h3 class="text-center">Contacto</h3>
              <table class="table  table-striped">
                <thead>
                <tr v-if="this.clientDetailData.telefonos.length > 0">
                  <th scope="col">Telefono</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="phone in this.clientDetailData.telefonos">
                  <td>{{phone.numero}}</td>
                </tr>
                </tbody>

              </table>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">#</span>
                <input v-model="this.newCellphone" type="text" class="form-control" placeholder="No. Telefono" aria-label="Username" aria-describedby="addon-wrapping">
                <button v-on:click="addClientCellphone" class="btn btn-success">Añadir</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button"
                    v-on:click="this.founded = false"
                    class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- CREATE CLIENT -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Admin. Clientes - Crear</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="this.newClientDetail.cedula" type="text" class="form-control" placeholder="Cedula" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <input v-model="this.newClientDetail.nombre" type="text" class="form-control" placeholder="Nombre cliente" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <select v-model="newClientDetail.id_ciudad" class="form-select mb-3">
              <option selected>Seleccionar ciudad</option>
              <option v-for="city in cities" :value="city.id">{{city.nombre}}</option>
            </select>
            <div class="input-group flex-nowrap mb-3">
              <span class="input-group-text" id="addon-wrapping">#</span>
              <input v-model="this.newCellphone" type="text" class="form-control" placeholder="No. Telefono" aria-label="Username" aria-describedby="addon-wrapping">
              <button v-on:click="this.newClientDetail.telefonos.push(this.newCellphone)" class="btn btn-success">Añadir</button>
            </div>
            <table class="table table-bordered table-striped">
              <tr v-for="phone in this.newClientDetail.telefonos">
                <td>{{phone}}</td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button"
                    v-on:click="this.newClientDetail = {cedula: '',
          nombre: '',
          id_ciudad: '',
          telefonos: []}"
                    class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" v-on:click="addClient" class="btn btn-success">Crear</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <DataTable ref="table" :data="clients" :columns="columns" class="table table-striped table-bordered display"
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
            <th>Cedula</th>
            <th>Nombre</th>
          </tr>
          </thead>
        </DataTable>
        <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Ver más información
        </button>
        <button type="button" class="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          Crear cliente
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>