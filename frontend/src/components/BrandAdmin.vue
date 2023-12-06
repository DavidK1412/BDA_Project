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
  name: 'BrandAdmin',
  components: { DataTable },
  data: function () {
    return {
      newBrandData: {
        id: '',
        nombre: '',
      },
      brands: [],
      columns: [
        { data: null, render: function (data, type, row, meta) {
          return meta.row + 1;
        }},
        { data: 'nombre' },
      ]
    }
  },
  methods: {
    getBrands: function () {
      axios.get('https://bda-project-d8ff.vercel.app/brands')
        .then(response => {
          this.brands = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    createBrand: function () {
      this.newBrandData.id = crypto.randomUUID();
      axios.post('https://bda-project-d8ff.vercel.app/brands', this.newBrandData)
        .then(response => {
          alert('Marca creada');
          this.getBrands();
        })
        .catch(error => {
          console.log(error);
        })
    },
    updateBrand: function () {
      axios.put(`https://bda-project-d8ff.vercel.app/brands/${this.newBrandData.id}`, this.newBrandData)
        .then(response => {
          alert('Marca actualizada');
          this.getBrands();
        })
        .catch(error => {
          console.log(error);
        })
    },
    deleteBrand: function () {
      axios.delete(`https://bda-project-d8ff.vercel.app/brands/${this.newBrandData.id}`)
        .then(response => {
          this.getBrands();
          alert('Marca eliminada');
        })
        .catch(error => {
          console.log(error);
        })
    },
  },
  mounted() {
    this.getBrands();
  }
}

</script>

<template>
  <div>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar marca</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select v-model="newBrandData.id" class="form-select mb-3">
              <option selected>Selecciona marca</option>
              <option v-for="brand in brands" :value="brand.id">{{brand.nombre}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="deleteBrand" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Editar Marca -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nueva marca</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <select v-model="newBrandData.id" class="form-select mb-3">
                <option selected>Selecciona marca</option>
                <option v-for="brand in brands" :value="brand.id">{{brand.nombre}}</option>
              </select>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input v-model="newBrandData.nombre" type="text" class="form-control" placeholder="Nombre de la marca" aria-label="Username" aria-describedby="basic-addon1">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="updateBrand" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Crear Marca -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nueva marca</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="newBrandData.nombre" type="text" class="form-control" placeholder="Nombre de la marca" aria-label="Username" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="createBrand" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-center">Marcas</h1>
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <DataTable ref="table" :data="brands" :columns="columns" class="table table-striped table-bordered display"
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
        <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          Editar Marca
        </button>
        <button type="button" class="btn btn-danger m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
          Eliminar Marca
        </button>
        <button type="button" class="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Crear Marca
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
