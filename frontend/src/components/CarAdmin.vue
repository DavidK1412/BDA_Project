<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import Select from 'datatables.net-select'
import jwtDecode from "jwt-decode";
import {fastKey} from "core-js/internals/internal-metadata.js";

DataTable.use(DataTableLib);
DataTable.use(Buttons);
DataTable.use(Select);

export default {
  name: 'CarAdmin',
  components: { DataTable },
  data: function () {
    return {
      placa: '',
      isNew: false,
      actualBranchId: jwtDecode(localStorage.getItem('token')).branchId,
      newCarData: {
        id: '',
        modelo: '',
        chasis: '',
        valor: '',
        id_color: '',
        id_linea: '',
        id_sucursal: '',
        id_tipo: '',
        id_marca: '',
      },
      selectedId: null,
      founded: false,
      actualCar: {},
      cars: [],
      colors: [],
      lines: [],
      types: [
        {id: 1, nombre: 'Camion'},
        {id: 2, nombre: 'Camioneta'},
        {id: 3, nombre: 'Automovil'},
      ],
      brands: [],
      colums: [
        {data: null, render: function (data, type, row, meta) {
            return meta.row + 1;
          }},
        {data: 'chasis'},
        {data: 'modelo'},
        {data: 'marca'},
        {data: 'linea'},
        {data: 'color'},
        {data: 'tipo'},
        {data: 'estado'},
        {data: 'valor'},
        {data: 'sucursal'}
      ]
    }
  },
  mounted() {
    this.getCars();
    this.getLines();
    this.getBrands()
    this.getColors();
  },
  methods: {
    fastKey,
    setCar: function (carId) {
      // revisa si el auto asociado al id es nuevo o usado
      if (this.cars.find(car => car.id === carId).estado === 'Nuevo') {
        let temporalList = {};
        axios.get(
            'https://bda-project-d8ff.vercel.app/autos/new',
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            }
        ).then((response) => {
          temporalList = response.data;
          this.actualCar = temporalList.find(car => car.id === carId);
          this.actualCar.estado = 'Nuevo';
          this.founded = true;
        }).catch((error) => {
          console.log(error);
        });
      } else {
        let temporalList = {};
        axios.get(
            'https://bda-project-d8ff.vercel.app/autos/used',
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            }
        ).then((response) => {
          temporalList = response.data;
          this.actualCar = temporalList.find(car => car.id === carId);
          this.actualCar.estado = 'Usado';
          this.founded = true;
        }).catch((error) => {
          console.log(error);
        });

      }
    },
    getCars: function () {
      axios.get(
          'https://bda-project-d8ff.vercel.app/autos',
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }).then((response) => {
        this.cars = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getBrands: function () {
      axios.get(
          'https://bda-project-d8ff.vercel.app/brands',
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }).then((response) => {
        this.brands = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getColors: function () {
      axios.get(
          'https://bda-project-d8ff.vercel.app/colors',
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }).then((response) => {
        this.colors = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    getLines: function (){
      axios.get('https://bda-project-d8ff.vercel.app/lines')
          .then(response => {
            this.lines = response.data;
          })
          .catch(error => {
            console.log(error);
          })
    },
    createCar: function () {
      this.newCarData.id = crypto.randomUUID();
      this.newCarData.id_sucursal = this.actualBranchId;
      axios.post('https://bda-project-d8ff.vercel.app/autos', this.newCarData)
          .then(response => {

            if(response.status === 200){
              if(this.isNew){
                axios.post('https://bda-project-d8ff.vercel.app/autos/new', {
                  id_auto: this.newCarData.id,
                })
                    .then(response => {
                      alert('Automovil creado');
                      this.getCars();
                    })
                    .catch(error => {
                      console.log(error);
                    })
              } else {
                axios.post('https://bda-project-d8ff.vercel.app/autos/used', {
                  id_auto: this.newCarData.id,
                  placa: this.placa,
                })
                    .then(response => {
                      alert('Automovil creado');
                      this.getCars();
                    })
                    .catch(error => {
                      console.log(error);
                    })
              }
              alert('Automovil creado');
              this.getCars();
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

  }

}
</script>

<template>
  <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Descripción automovil</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select v-model="selectedId" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
              <option selected>Seleccionar</option>
              <!-- Mapea todos los autos, opcion es Marca + Linea + Modelo y el valor de la opción es el ID  -->
              <option  v-for="car in cars" :value="car.id">{{car.marca}} {{car.linea}} {{car.modelo}}</option>
            </select>
            <!-- Boton para buscar la información del auto seleccionado -->
            <button v-on:click="setCar(selectedId)" type="button" class="btn btn-primary">Buscar</button>
            <div v-if="this.founded">
              <!--- Muestra la información del auto seleccionado -->
              <p v-if="this.actualCar.estado !== 'Usado'">ID Interno: {{this.actualCar.id_interno}}</p>
              <!-- Muestra la placa o el id interno, en tal caso de que el objeto tenga la propiedad. -->
              <p v-if="this.actualCar.estado === 'Usado'">Placa: {{this.actualCar.placa}}</p>
              <p> Marca: {{this.actualCar.marca.nombre}} </p>
              <p> Chasis: {{this.actualCar.chasis}} </p>
              <p> Modelo: {{this.actualCar.modelo}} </p>
              <p> Linea: {{this.actualCar.linea.nombre}} </p>
              <p> Color: {{this.actualCar.color.nombre}} </p>
              <p> Tipo: {{this.actualCar.tipo}} </p>
              <p> Valor: $ {{ this.actualCar.valor }}</p>
              <p> Sucursal: {{this.actualCar.sucursal[0].nombre}} </p>
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
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear automovil</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input v-model="newCarData.chasis" type="text" class="form-control" placeholder="Chasis" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <input v-model="newCarData.modelo" type="text" class="form-control" placeholder="Modelo" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <input v-model="newCarData.valor" type="text" class="form-control" placeholder="Valor" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <select v-model="newCarData.id_color" class="form-select mb-3">
                <option selected>Seleccionar color</option>
                <option v-for="color in colors" :value="color.id">{{color.nombre}}</option>
              </select>
              <select v-model="newCarData.id_linea" class="form-select mb-3">
                <option selected>Seleccionar linea</option>
                <option v-for="line in lines" :value="line.id">{{line.nombre}}</option>
              </select>
              <select v-model="newCarData.id_tipo" class="form-select mb-3">
                <option selected>Seleccionar tipo</option>
                <option v-for="type in types" :value="type.id">{{type.nombre}}</option>
              </select>
              <select v-model="newCarData.id_marca" class="form-select mb-3">
                <option selected>Seleccionar marca</option>
                <option v-for="brand in brands" :value="brand.id">{{brand.nombre}}</option>
              </select>
              <!-- Selecciona si el auto es nuevo o usado -->
              <select v-model="isNew" class="form-select mb-3">
                <option selected>Seleccionar estado</option>
                <option value="true">Nuevo</option>
                <option value="false">Usado</option>
              </select>

              <!-- Campo para escribir placa en caso de que sea usado -->

                <div class="input-group mb-3">
                  <input v-model="placa" type="text" class="form-control" placeholder="Placa (solo rellenar en caso que sea usado el automovil)" aria-label="Username" aria-describedby="basic-addon1">
                </div>

          </div>
          <div class="modal-footer">
            <button type="button"
                    class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" v-on:click="createCar" class="btn btn-success">Crear</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 offset-lg-2">
      <h3 class="text-center">Sólo se muestran autos que no han sido vendidos</h3>
      <div class="table-responsive">
        <DataTable ref="table" :data="cars" :columns="colums" class="table table-striped table-bordered display"
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
            <th>Chasis</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Linea</th>
            <th>Color</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Valor</th>
            <th>Sucursal</th>
          </tr>
          </thead>
        </DataTable>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Ver más información
        </button>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          Crear automovil
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>