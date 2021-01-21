<template>
  <div class="container mt-4">
    <div class="col-md-12">
      <h1>Cantidad de producto por servicio</h1>
      <table class="table table-success">
        <thead>
          <tr>
            <th scope="col">Implemento</th>
            <th scope="col">#piezas</th>
            <th scope="col">Lavado Express</th>
            <th scope="col">Lavado Profundo</th>
            <th scope="col">Sabanas</th>
            <th scope="col">Cobijas</th>
            <th scope="col">Ropa de bb</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">Detergente</td>
            <td>10</td>
            <td>10ml</td>
            <td>19ml</td>
            <td>35ml</td>
            <td>50ml</td>
            <td>0ml</td>
          </tr>
          <tr>
            <td scope="row">Suavizante</td>
            <td>10</td>
            <td>4ml</td>
            <td>6ml</td>
            <td>12ml</td>
            <td>15ml</td>
            <td>6ml</td>
          </tr>
          <tr>
            <td scope="row">Detergente Bbs</td>
            <td>10</td>
            <td>0ml</td>
            <td>0ml</td>
            <td>0ml</td>
            <td>0ml</td>
            <td>16ml</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-md-8">
      <h1>Reporte de servicios de Lavanderia</h1>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Servicio/Cantidad</th>
            <th scope="col">Lavado Express</th>
            <th scope="col">Lavado Profundo</th>
            <th scope="col">Sabanas</th>
            <th scope="col">Cobijas</th>
            <th scope="col">Ropa de bb</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">#Solicitudes</th>
            <td >{{this.expres}}2</td>
            
                    
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-md-12">
      <h1>Insumos por servicios</h1>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id Servicio</th>
            <th scope="col">Tipo de servicio</th>
            <th scope="col">Cantidad de piezas</th>
            <th scope="col">Cant. Detergente</th>
            <th scope="col">Cant. Suavizante</th>
            <th scope="col">Cant. Detergente BBs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in services" :key="index">
            <th scope="row">{{ item._id }}</th>

            <td>{{ item.itemName }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <span v-if="item.itemName === 'Express'"
                >{{ item.quantity }} ml</span
              >
              <span v-if="item.itemName === 'Profundo'"
                >{{ item.quantity * 1.9 }} ml</span
              >
              <span v-if="item.itemName === 'Sabanas'"
                >{{ item.quantity * 3.5 }} ml</span
              >
              <span v-if="item.itemName === 'Cobijas'"
                >{{ item.quantity * 5 }} ml</span
              >
              <span v-if="item.itemName === 'Ropa de bb'"
                >{{ item.quantity * 0 }} ml</span
              >
            </td>
            <td>
              <span v-if="item.itemName === 'Express'"
                >{{ item.quantity * 0.4 }} ml</span
              >
              <span v-if="item.itemName === 'Profundo'"
                >{{ item.quantity * 0.6 }} ml</span
              >
              <span v-if="item.itemName === 'Sabanas'"
                >{{ item.quantity * 1.2 }} ml</span
              >
              <span v-if="item.itemName === 'Cobijas'"
                >{{ item.quantity * 1.5 }} ml</span
              >
              <span v-if="item.itemName === 'Ropa de bb'"
                >{{ item.quantity * 0.6 }} ml</span
              >
            </td>
            <td>
              <span v-if="item.itemName === 'Express'"
                >{{ item.quantity * 0 }} ml</span
              >
              <span v-if="item.itemName === 'Profundo'"
                >{{ item.quantity * 0 }} ml</span
              >
              <span v-if="item.itemName === 'Sabanas'"
                >{{ item.quantity * 0 }} ml</span
              >
              <span v-if="item.itemName === 'Cobijas'"
                >{{ item.quantity * 0 }} ml</span
              >
              <span v-if="item.itemName === 'Ropa de bb'"
                >{{ item.quantity * 1.6 }} ml</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
        quantity: "",
        itemName: "",
      },
        expres: 0,
        profundo: 0,
        sabanas: 0,
        cobijas: 0,
        bb: 0,
    };
  },
  mounted: function () {},
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
          
          this.services = res.data;
          
          if(this.services.itemName === 'Express'){
              this.expres = this.expres +1
          }

          
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    
  },
};
</script>

<style scoped>
td {
  text-align: center;
  font-weight: lighter;
}
th {
  text-align: center;
  font-weight: bolder;
}
</style>