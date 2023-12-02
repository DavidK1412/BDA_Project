<template>
 <div>
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel">Añadir Empleado</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="this.employeePrototype.cedula" type="text" class="form-control" placeholder="Cedula Empleado" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="this.employeePrototype.nombre" type="text" class="form-control" placeholder="Nombre Empleado" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="this.employeePrototype.salario" type="text" class="form-control" placeholder="Salario Empleado" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="this.employeePrototype.fecha_nacimiento" type="text" class="form-control" placeholder="Fecha de nacimiento Empleado" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">@</span>
              <input v-model="this.employeePrototype.fecha_ingreso" type="text" class="form-control" placeholder="Fecha de ingreso Empleado" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <select v-model="this.employeePrototype.id_cargo" class="form-select mb-3">
                <option selected>Selecciona cargo</option>
                <option value="0">Empleado</option>
                <option value="1">Gerente</option>
              </select>
              <!-- Campo para agregar telefonos -->
              <div class="input-group flex-nowrap mb-3">
              <input v-model="this.tempoTel" type="text" class="form-control" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1">
              <button v-on:click="this.employeePrototype.telefonos.push(this.tempoTel)" type="button" class="btn btn-primary">Añadir</button>
              </div>
              <!-- Muestra en tabla los telefonos agregados -->
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tel in this.employeePrototype.telefonos">
                    <td>{{tel}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
         </div>
         <div class="modal-footer">
           <button v-on:click="clearProtoEmployee" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button v-on:click="submitEmployee" type="button" class="btn btn-primary">Save changes</button>
         </div>
       </div>
     </div>
   </div>

   <!-- Editar empleado -->
   <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel">Editar empleado</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <select v-model="selectedEmployee" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option v-for="employee in employees" :value="employee.codigo">{{employee.nombre}}</option>
           </select>
            <button v-on:click="getSelectedEmployee" type="button" class="btn btn-primary">Buscar</button>
           <div v-if="selectedEmployee !== null">
             <div class="input-group mb-3">
               <span class="input-group-text" id="basic-addon1">@</span>
               <input v-model="this.employeePrototype.cedula" type="text" class="form-control" placeholder="Cedula Empleado" aria-label="Username" aria-describedby="basic-addon1">
             </div>
             <div class="input-group mb-3">
               <span class="input-group-text" id="basic-addon1">@</span>
               <input v-model="this.employeePrototype.nombre" type="text" class="form-control" placeholder="Nombre Empleado" aria-label="Username" aria-describedby="basic-addon1">
             </div>
             <div class="input-group mb-3">
               <span class="input-group-text" id="basic-addon1">@</span>
               <input v-model="this.employeePrototype.salario" type="text" class="form-control" placeholder="Salario Empleado" aria-label="Username" aria-describedby="basic-addon1">
             </div>
             <div class="input-group mb-3">
               <span class="input-group-text" id="basic-addon1">@</span>
               <input v-model="this.employeePrototype.fecha_nacimiento" type="text" class="form-control" placeholder="Fecha de nacimiento Empleado" aria-label="Username" aria-describedby="basic-addon1">
             </div>
             <div class="input-group mb-3">
               <span class="input-group-text" id="basic-addon1">@</span>
               <input v-model="this.employeePrototype.fecha_ingreso" type="text" class="form-control" placeholder="Fecha de ingreso Empleado" aria-label="Username" aria-describedby="basic-addon1">
             </div>
             <div class="input-group mb-3">
               <select v-model="this.employeePrototype.id_cargo" class="form-select mb-3">
                 <option selected>Selecciona cargo</option>
                 <option value="0">Empleado</option>
                 <option value="1">Gerente</option>
               </select>
               <!-- Muestra en tabla los telefonos agregados -->
               <table class="table">
                 <thead>
                 <tr>
                   <th scope="col">Telefono</th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr v-for="tel in this.employeePrototype.telefonos">
                   <td>{{tel.numero}}</td>
                 </tr>
                 </tbody>
                </table>
             </div>
           </div>
         </div>
         <div class="modal-footer">
           <button v-on:click="clearProtoEmployee" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button v-on:click="updateEmployee" type="button" class="btn btn-primary">Save changes</button>
         </div>
       </div>
     </div>
   </div>

   <!-- Asociar usuario -->
   <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel">Asociar usuario</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <select v-model="associatedUserPrototype.employeeCode" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option v-for="employee in employees" :value="employee.codigo">{{employee.nombre}}</option>
           </select>
           <div v-if="associatedUserPrototype !== null">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input v-model="this.associatedUserPrototype.username" type="text" class="form-control" placeholder="Nombre de usuario" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input v-model="this.associatedUserPrototype.password" type="text" class="form-control" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1">
              </div>
           </div>

         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button v-on:click="addAssociatedUser" type="button" class="btn btn-primary">Save changes</button>
         </div>
       </div>
     </div>
   </div>

   <div class="col-lg-8 offset-lg-2">
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
           <th>Codigo</th>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Salario</th>
            <th>Fecha de nacimiento</th>
            <th>Fecha de ingreso</th>
            <th>Cargo</th>
            <th>Salario</th>
         </tr>
         </thead>
       </DataTable>
       <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Añadir Empleado
       </button>
       <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          Editar Empleado
       </button>
       <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal3">
         Asociar Usuario
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
  import jwtDecode from "jwt-decode";

  DataTable.use(DataTableLib);
  DataTable.use(Buttons);
  DataTable.use(Select);
  export default {
    name: 'EmployeeAdmin',
    components: {
      DataTable
    },
    data() {
      return {
        associatedUserPrototype: {
          userId: '',
          username: '',
          employeeCode: '',
          password: ''
        },
        selectedEmployee: '',
        employeePrototype: {
          cedula: '',
          nombre: '',
          salario: 0,
          fecha_nacimiento: '',
          fecha_ingreso: '',
          id_cargo: 0,
          id_sucursal: this.actualBranchId,
          telefonos: []
        },
        tempoTel: '',
        employeeCode: jwtDecode(localStorage.getItem('token')).employeeCode,
        actualBranch: '',
        employees: [],
        actualBranchId: '',
        columns: [
          {data: null, render: function (data, type, row, meta) {
            return meta.row + 1;
          }},
          {data: 'codigo'},
          {data: 'cedula'},
          {data: 'nombre'},
          {data: 'salario'},
          {data: 'fecha_nacimiento'},
          {data: 'fecha_ingreso'},
          {data: 'id_cargo'},
          {data: 'salario'},
        ],
      }
    },
    methods: {
      getActualBranch: async function() {
        await axios.get(
            `http://localhost:3000/employees/${this.employeeCode}`,
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            }
        ).then((response) => {
          this.actualBranch = response.data.sucursal.nombre;
          this.actualBranchId = response.data.sucursal.id;
        }
        ).catch((error) => {
          console.log(error);
        });
        axios.get('http://localhost:3000/employees/api/branch/' + this.actualBranchId)
            .then((response) => {
              console.log(response.data);
              this.employees = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
      },
      submitEmployee: function () {
        this.employeePrototype.id_sucursal = this.actualBranchId;
        axios.post('http://localhost:3000/employees', this.employeePrototype)
            .then((response) => {
              console.log(response.data);
              this.clearProtoEmployee();
              this.getActualBranch();
              alert('Empleado añadido con exito');
            })
            .catch((error) => {
              console.log(error);
            })
      },
      clearProtoEmployee: function () {
        this.employeePrototype = {
          cedula: '',
          nombre: '',
          salario: 0,
          fecha_nacimiento: '',
          fecha_ingreso: '',
          id_cargo: 0,
          id_sucursal: this.actualBranchId,
          telefonos: []
        }
      },
      getSelectedEmployee: function () {
        const id = this.selectedEmployee;
        axios.get('http://localhost:3000/employees/' + id)
            .then((response) => {
              console.log(response.data);
              this.employeePrototype.cedula = response.data.cedula;
              this.employeePrototype.nombre = response.data.nombre;
              this.employeePrototype.salario = response.data.salario;
              this.employeePrototype.fecha_nacimiento = response.data.fecha_nacimiento;
              this.employeePrototype.fecha_ingreso = response.data.fecha_ingreso;
              this.employeePrototype.id_cargo = response.data.id_cargo;
              this.employeePrototype.id_sucursal = response.data.id_sucursal;
              this.employeePrototype.telefonos = response.data.telefonos;
            })
            .catch((error) => {
              console.log(error);
            })
      },
      updateEmployee: function () {
        const id = this.selectedEmployee;
        axios.put('http://localhost:3000/employees/' + id, this.employeePrototype)
            .then((response) => {
              console.log(response.data);
              this.clearProtoEmployee();
              this.getActualBranch();
              alert('Empleado actualizado con exito');
            })
            .catch((error) => {
              console.log(error);
            })
      },
addAssociatedUser: function () {
        this.associatedUserPrototype.userId = crypto.randomUUID();
        axios.post('http://localhost:3000/auth/signup', this.associatedUserPrototype,
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            .then((response) => {
              console.log(response.data);
              this.clearProtoEmployee();
              this.getActualBranch();
              alert('Empleado actualizado con exito');
            })
            .catch((error) => {
              console.log(error);
            })
      }
    },
    mounted() {
      this.getActualBranch();
    }
  }
</script>

<style scoped>

</style>