<template>
  <div>
    <div class="m-3"><h1 >Lista de servicios solicitados por los usuarios</h1></div>
    <ul>
      <li v-for="(item, index) in services" :key="index">
        <div>
          <b-card body-bg-variant="dark" img-src="https://i.picsum.photos/id/1059/7360/4912.jpg?hmac=vVWk1qyiXN_VgPhpNqFm3yl2HUPW6fHqYOjTHYO2bHQ" tag="article" style="max-width: 20rem" class="mb-2">
            <b-card-text>Nombre proyecto: <span>{{item.projectId}}</span> </b-card-text>
            <b-card-text>Provincia: <span>{{item.province}}</span> </b-card-text>
            <b-card-text>Direccion: <span>{{item.address}}</span></b-card-text>
            <b-card-text>Fecha: <span>{{item.dateRequired}}</span> </b-card-text>
            <b-card-text>Servicio: <span ref="servspan">{{item.serviceType}}</span> </b-card-text>
            <b-card-text>Tipo: <span>{{item.itemName}}</span> </b-card-text>
            <b-card-text>Cantidad  piezas: <span ref="qspan">{{item.quantity}}</span> </b-card-text>
            <b-card-text>Usuario: <span>{{item.userId}}</span> </b-card-text>
            <hr>
          </b-card>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      services: [],
      service: {
        projectId: "",
        province: "",
        address: "",
        dateRequired: "",
        userId: "",
        quantity:"",
        itemName:""
      },
    };
  },
  mounted: function(){
    
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
        .get("/services", config)
        .then((res) => {
          console.log(res.data);
          this.services = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: wrap;
}
li {
  list-style: none;
  margin: 10px 50px 0 0;
}
</style>