<template>
  <div class="container-fluid ml-5 form-row">
    <div class="form-group col-md-6">
      <h1>Stock</h1>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">_Id</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad en Stock(ml)</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in stocks" :key="index">
            <th scope="row">{{ item._id }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <b-button
                class="btn-warning btn-sm mx-2"
                @click="activarEdicion(item._id)"
                >Actualizar</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <form class="mt-5 mb-5 ml-4 form-group col-md-4"  @submit.prevent="editStock(stockEdit)" v-if="editar" >
      <h4>Actualizar Stock</h4>
      <input type="text" placeholder="Nombre" class="form-control my-2" v-model="stockEdit.name" disabled />
      <label>#Unidades (ml)</label>
      <input type="number" class="form-control" placeholder="Ej: 20" v-model="stockEdit.quantity"/>

      <b-button class="btn-danger mt-3" type="submit">Edit</b-button>
      <b-button class="btn-success mt-3 ml-3" type="submit" @click="editar = false">Cancel</b-button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      stocks: [],
      stock: {
        stockId: "",
        name: "",
        quantity: 0,
      },
      stockEdit: {},
      editar: false,
    };
  },
  created() {
    this.listStock();
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    listStock() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .get("/stocks", config)
        .then((res) => {
          console.log(res.data);
          this.stocks = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    activarEdicion(id) {
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.editar = true;
      this.axios
        .get(`/stock/${id}`, config)
        .then((res) => {
          this.stockEdit = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    editStock(item) {
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .put(`/stock/${item._id}`, item, config)
        .then((res) => {
          const index = this.stocks.findIndex((n) => n._id === res.data._id);
          //this.stocks[index].name = res.data.name;
          this.stocks[index].quantity = res.data.quantity;
          this.stockEdit = {};
          this.editar = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
