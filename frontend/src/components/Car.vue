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
    <div class="col-lg-8 offset-lg-2">
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
      </div>
    </div>
  </div>
</template>

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
  name: 'Car',
  components: {DataTable},
  data: function () {
    return {
      selectedId: null,
      founded: false,
      actualCar: {},
      cars: [],
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
  },
  methods: {
    setCar: function (carId) {
      // revisa si el auto asociado al id es nuevo o usado
      if (this.cars.find(car => car.id === carId).estado === 'Nuevo') {
        let temporalList = {};
        axios.get(
            'http://localhost:3000/autos/new',
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
            'http://localhost:3000/autos/used',
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
        'http://localhost:3000/autos',
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
  }
}



</script>

<style scoped>

</style>