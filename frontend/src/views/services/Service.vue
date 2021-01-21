<template>
  <div class="container">
    <form class="mt-5 mb-5" @submit.prevent="addService()">
      <h3>Agregar nuevo servicio</h3>
      <h4>Rellena los siguientes campos solicitados</h4>
      <input
        type="text"
        class="form-control my-2"
        placeholder="Descripcion del proyecto"
        v-model="service.projectId"
      />
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="inputCity">Provincia</label>
          <b-form-select
            id="provinceSelect"
            v-model="service.province"
            :options="options"
            
          ></b-form-select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputState">Fecha</label>
          <b-form-datepicker
            id="datepicker"
            class="mb-2"
            v-model="service.dateRequired"
          ></b-form-datepicker>
        </div>
        <div class="form-group col-md-6">
          <label>Direccion</label>
          <input
            type="text"
            class="form-control my-2"
            placeholder="Address"
            v-model="service.address"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <label for="serviceSelect">Servicio</label>
          <b-form-select
            id="serviceSelect"
            v-model="service.serviceType"
            :options="itemOptions"
          ></b-form-select>
        </div>
        <div class="col">
          <label for="serviceSelect">Tipo de Items al servicio</label>
          <b-form-select
            id="serviceSelect"
            v-model="service.itemName"
            :options="serviceOptions"
          ></b-form-select>
        </div>
        <div class="col">
          <label>Ingrese cantidad de items al servicio</label>
          <input type="number" class="form-control" min="0" placeholder="Ej: 20" v-model="service.quantity" />
        </div>
      </div>

      <b-button class="btn-success my-2 mx-2 btn-block" type="submit"
        >Agregar</b-button
      >
    </form>

    <!--fin formulario-->
    <!--Inicio de tablas -->
    <div class="mb-5"><hr /></div>

    <h1>Servicios Solicitados</h1>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Descripcion</th>
          <th scope="col">Provincia</th>
          <th scope="col">Direccion</th>
          <th scope="col">Fecha de solicitud</th>
          <th scope="col">Servicio Solicitado</th>
          <th scope="col">Tipo Servicio</th>
          <th scope="col">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in services" :key="index">
          <th scope="row">{{ item.projectId }}</th>
          <td>{{ item.province }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.dateRequired }}</td>
          <td>{{ item.serviceType }}</td>
          <td>{{ item.itemName }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      services: [],
      selected: "Lavanderia",
      itemOptions: [
        { value: "Lavanderia", text: "Lavanderia" }
      ],
      serviceOptions: [
        { value: "Express", text: "Lavado Express" },
        { value: "Profundo", text: "Lavado Profundo" },
        { value: "Sabanas", text: "Sabanas" },
        { value: "Cobijas", text: "Cobijas" },
        { value: "Ropa de bb", text: "Ropa de bb" },
      ],
      options: [
        { value: "Azuay", text: "Azuay" },
        { value: "Bolivar", text: "Bolivar" },
        { value: "Canar", text: "Canar" },
        { value: "Carchi", text: "Carchi" },
        { value: "Chimborazo", text: "Chimborazo" },
        { value: "Cotopaxi", text: "Cotopaxi" },
        { value: "El Oro", text: "El Oro" },
        { value: "Esmeraldas", text: "Esmeraldas" },
        { value: "Galapagos", text: "Galapagos" },
        { value: "Guayas", text: "Guayas" },
        { value: "Imbabura", text: "Imbabura" },
        { value: "Loja", text: "Loja" },
        { value: "Los Rios", text: "Los Rios" },
        { value: "Manabi", text: "Manabi" },
        { value: "Morona Santiago", text: "Morona Santiago" },
        { value: "Napo", text: "Napo" },
        { value: "Orellana", text: "Orellana" },
        { value: "Pastaza", text: "Pastaza" },
        { value: "Pichincha", text: "Pichincha" },
        { value: "Santa Elena", text: "Santa Elena" },
        { value: "Santo Domingo", text: "Santo Domingo" },
        { value: "Sucumbios", text: "Sucumbios" },
        { value: "Tunguruhua", text: "Tungurahua" },
        { value: "Zamora", text: "Zamora" },
      ],
      service: {
        projectId: "",
        province: "",
        address: "",
        dateRequired: "",
        serviceType: "",
        itemName: "",
        quantity: 0,
      },
    };
  },
  created() {
    this.listServices();
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    listServices() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .get("/service", config)
        .then((res) => {
          console.log(res.data);
          this.services = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addService() {
      let config = {
        headers: {
          token: this.token,
        },
      };
      //console.log(this.service);
      this.axios
        .post("/new-service", this.service, config)
        .then((res) => {
          this.services.push(res.data);
          this.service.projectId = "";
          this.service.province = "";
          this.service.address = "";
          this.service.dateRequired = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>