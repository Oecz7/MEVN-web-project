<template>
  <div class="container">
    <div class="row">
      <div class="col">
          Information of {{ $route.params.id }}
          <table class="table">
        <thead>
          <tr>
            <th scope="col">ProjectID</th>
            <th scope="col">Provincia</th>
            <th scope="col">Direccion</th>
            <th scope="col">Fecha de solicitud</th>

            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in services" :key="index">
            <th scope="row">{{ item.projectId }}</th>
            <td>{{ item.province }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.dateRequired }}</td>
            <td>
              <router-link
                class="pill btn btn-success ms-2 btn-sm"
                :to="{
                  name: 'Service-info',
                  params: {
                    id: item._id,
                  },
                }"
              >
                Info
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="col">2 of 2</div>
    </div>
  </div>
  
</template>

<script>
export default {};
</script>

<style>
</style>