<template>
  <div>
    <!-- Crear Color -->
    <div class="modal fade" id="createColorModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nuevo color</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="newColorData.nombre" type="text" class="form-control" placeholder="Nombre del color" aria-label="Username" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="createColor" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Editar color -->
    <div class="modal fade" id="updateColorModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar color</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <select v-model="newColorData.id" class="form-select mb-3">
                <option selected>Selecciona marca</option>
                <option v-for="color in colors" :value="color.id">{{color.nombre}}</option>
              </select>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input v-model="newColorData.nombre" type="text" class="form-control" placeholder="Nombrel color" aria-label="Username" aria-describedby="basic-addon1">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="updateColor" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Crear Linea -->
    <div class="modal fade" id="createLineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nueva linea</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <select v-model="newLineData.id_marca" class="form-select mb-3">
                <option selected>Selecciona marca</option>
                <option v-for="brand in brands" :value="brand.id">{{brand.nombre}}</option>
              </select>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input v-model="newLineData.nombre" type="text" class="form-control" placeholder="Nombre de la linea" aria-label="Username" aria-describedby="basic-addon1">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="createLine" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Editar Linea -->
    <div class="modal fade" id="updateLineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nueva linea</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <select v-model="newLineData.id" class="form-select mb-3">
                <option selected>Selecciona marca</option>
                <option v-for="line in lines" :value="line.id">{{line.nombre}}</option>
              </select>
              <select v-model="newLineData.id_marca" class="form-select mb-3">
                <option selected>Selecciona marca</option>
                <option v-for="brand in brands" :value="brand.id">{{brand.nombre}}</option>
              </select>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input v-model="newLineData.nombre" type="text" class="form-control" placeholder="Nombre de la linea" aria-label="Username" aria-describedby="basic-addon1">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="updateLine" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-center">Gestión colores y lineas</h1>
    <div class="d-flex justify-content-center">
      <!-- Botones para cambiar entre vista y otra -->
      <button v-on:click="colorsTable = true" class="btn btn-primary m-1">Colores</button>
      <button v-on:click="colorsTable = false" class="btn btn-danger m-1">Lineas</button>
    </div>
    <div v-if="this.colorsTable" class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <DataTable ref="table" :data="colors" :columns="columns" class="table table-striped table-bordered display"
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
            <th>Nombre</th>
          </tr>
          </thead>
        </DataTable>
        <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#updateColorModal">
          Editar Color
        </button>
        <button type="button" class="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#createColorModal">
          Crear Color
        </button>
      </div>
  </div>
    <div v-if="!this.colorsTable" class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <DataTable ref="table" :data="lines" :columns="linesColumns" class="table table-striped table-bordered display"
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
            <th>Nombre</th>
            <th>Marca</th>
          </tr>
          </thead>
        </DataTable>
        <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#updateLineModal">
          Editar Linea
        </button>
        <button type="button" class="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#createLineModal">
          Crear Linea
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
  name: 'ColorAdmin',
  components: { DataTable },
  data: function () {
    return {
      colorsTable: true,
      newColorData: {
        id: '',
        nombre: '',
      },
      newLineData: {
        id: '',
        nombre: '',
        id_marca: ''
      },
      brands: [],
      lines: [],
      linesColumns: [
        { data: null, render: function (data, type, row, meta) {
          return meta.row + 1;
        }},
        { data: 'nombre' },
        { data: 'marca.nombre'}
      ],
      colors: [],
      columns: [
        { data: null, render: function (data, type, row, meta) {
          return meta.row + 1;
        }},
        { data: 'nombre' },
      ]
    }
  },
  methods: {
    getColors: function () {
      axios.get('https://bda-project-d8ff.vercel.app/colors')
        .then(response => {
          this.colors = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    createColor: function () {
      this.newColorData.id = crypto.randomUUID();
      axios.post('https://bda-project-d8ff.vercel.app/colors', this.newColorData)
        .then(response => {
          alert('Color creado');
          this.getColors();
        })
        .catch(error => {
          console.log(error);
        })
    },
    updateColor: function () {
      axios.put(`https://bda-project-d8ff.vercel.app/colors/${this.newColorData.id}`, this.newColorData)
        .then(response => {
          alert('Color actualizado');
          this.getColors();
        })
        .catch(error => {
          console.log(error);
        })
    },
    deleteColor: function () {
      axios.delete(`https://bda-project-d8ff.vercel.app/colors/${this.newColorData.id}`)
        .then(response => {
          alert('Color eliminado');
          this.getColors();
        })
        .catch(error => {
          console.log(error);
        })
    },
    getLines: function () {
      axios.get('https://bda-project-d8ff.vercel.app/lines')
        .then(response => {
          this.lines = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    createLine: function () {
      this.newLineData.id = crypto.randomUUID();
      axios.post('https://bda-project-d8ff.vercel.app/lines', this.newLineData)
        .then(response => {
          alert('Linea creada');
          this.getLines();
        })
        .catch(error => {
          console.log(error);
        })
    },
    updateLine: function () {
      axios.put(`https://bda-project-d8ff.vercel.app/lines/${this.newLineData.id}`, this.newLineData)
        .then(response => {
          alert('Linea actualizada');
          this.getLines();
        })
        .catch(error => {
          console.log(error);
        })
    },

    getBrands: function () {
      axios.get('https://bda-project-d8ff.vercel.app/brands')
        .then(response => {
          this.brands = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
  },
  mounted() {
    this.getColors();
    this.getLines();
    this.getBrands();
  }
}
</script>

<style scoped>

</style>