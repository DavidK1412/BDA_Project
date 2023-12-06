<script>

import {defineComponent} from "vue";
import NewClientsReport from "./reportscomponents/NewClientsReport.vue";
import MostSoldFilter from "./reportscomponents/MostSoldFilter.vue";
import NewDetailedClients from "./reportscomponents/NewDetailedClients.vue";
import MostNewBrands from "./reportscomponents/MostNewBrands.vue";
import EmployeeDetailed from "./reportscomponents/EmployeeDetailed.vue";

export default defineComponent({
  components: {EmployeeDetailed, MostNewBrands, NewDetailedClients, MostSoldFilter, NewClientsReport}
})
</script>

<template>
  <div>


    <!-- Div centrado bootstrap -->
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#newClientsModal">
        Consolidado de clientes mensual
      </button>
      <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#mostSoldFilter">
        Filtrar por marca más vendida (Nuevo - usado)
      </button>
      <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#NewDetailedClientsModal">
        Consolidado Detallado clientes nuevos
      </button>
      <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#DetailNewBrandsModal">
        Detalle marcas nuevas más vendidas
      </button>
      <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#EmployeesModal">
        Detalle empleados
      </button>
    </div>

    <!-- Modal -->
    <div class="modal modal-xl fade" id="EmployeesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Detalle empleados</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <EmployeeDetailed></EmployeeDetailed>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="DetailNewBrandsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Detalle marcas nuevas más vendidas</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <MostNewBrands></MostNewBrands>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="NewDetailedClientsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Consolidado Detallado clientes nuevos</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <NewDetailedClients></NewDetailedClients>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="newClientsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Consolidado Clientes mensual</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <NewClientsReport></NewClientsReport>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="mostSoldFilter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Filtrar por marca más vendida (Nuevo - usado)</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <MostSoldFilter></MostSoldFilter>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>