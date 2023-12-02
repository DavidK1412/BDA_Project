<script setup>

</script>

<template>
  <div>
    <div>
      <!-- Formulario con boton para buscar el número de clientes en un mes y un año -->
      <label for="monthYear">Buscar número de clientes en un mes y año</label>
      <input type="month" v-model="monthYear" class="form-control">
      <button v-on:click="getSpecialReports(monthYear)" type="button" class="btn btn-primary">Buscar</button>
      <!-- Input no editable para mostrar el numero de clientes -->
      <h3>
        <!-- Muestra el número de clientes en un mes y año -->
        El número de clientes en el mes y año seleccionado es: {{8}}
      </h3>

      <!-- Tabla con columnas: Sucursal, Año, mes, estado, marca, cantidad ventas -->
      <!-- SELECT nuevos o usados -->
      <label for="state">Seleccionar estado</label>
      <select v-model="state" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
        <option selected>Seleccionar</option>
        <option value="Nuevo">Nuevo</option>
        <option value="Usado">Usado</option>
      </select>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Sucursal</th>
          <th scope="col">Año</th>
          <th scope="col">Mes</th>
          <th scope="col">Estado</th>
          <th scope="col">Marca</th>
          <th scope="col">Cantidad ventas</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>BA - Leticia</td>
          <td>2023</td>
          <td>Agosto</td>
          <td>Muevo</td>
          <td>Chevrolet</td>
          <td>1</td>
        </tr>
        <tr>
          <td>BA - PASTO</td>
          <td>2023</td>
          <td>Octubre</td>
          <td>Nuevo</td>
          <td>Ford</td>
          <td>1</td>
        </tr>
        <tr>
          <td>BA - Riohacha</td>
          <td>2023</td>
          <td>Diciembre</td>
          <td>Nuevo</td>
          <td>Honda</td>
          <td>12</td>
        </tr>
        </tbody>
      </table>
      <label for="monthYear">Buscar clientes nuevos en un mes y año</label>
      <input type="month" v-model="monthYear" class="form-control">
      <button v-on:click="getSpecialReports(monthYear)" type="button" class="btn btn-primary">Buscar</button>
      <!-- Tabla con columnas: Sucursal, cedula, nombre, fecha de ingreso -->
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Sucursal</th>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Fecha de ingreso</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>BA - Riohacha</td>
          <td>1015993002</td>
          <td>David Casallas</td>
          <td>2023-11-08</td>
        </tr>
        <tr>
          <td>BA - Barranquilla</td>
          <td>71061</td>
          <td>Duane Shelton</td>
          <td>2023-11-02</td>
        </tr>
        <tr>
          <td>BA - Medellin</td>
          <td>15456</td>
          <td>Abigail Wong</td>
          <td>2023-11-03</td>
        </tr>
        </tbody>
      </table>
      <label for="monthYear">Buscar marca de carros nuevos mas vendidos en un mes y año</label>
      <input type="month" v-model="monthYear" class="form-control">
      <button v-on:click="getSpecialReports(monthYear)" type="button" class="btn btn-primary">Buscar</button>
      <!-- Tabla con columnas: Sucursal, marca, cantidad ventas, sólo tiene una fila : BA - Leticia , Chevrolet, 1 -->
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Sucursal</th>
          <th scope="col">Marca</th>
          <th scope="col">Cantidad ventas</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>BA - Leticia</td>
          <td>Chevrolet</td>
          <td>1</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>

</style>