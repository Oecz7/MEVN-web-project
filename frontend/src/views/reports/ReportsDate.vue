<template>
  <div class="container">
    <div class="col-md-12">
      <h1>Reporte: Fechas - insumos</h1>

      <table class="table table-dark mt-4">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Cant. Detergente</th>
            <th scope="col">Cant. Suavizante</th>
            <th scope="col">Cant. Detergente BBs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in services" :key="index">
            <td>{{ item.dateRequired }}</td>

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

      <h3>Filtrar</h3>
      <input type="text" placeholder="Filter by date" v-model="filter" />
      <table class="table table-hover table-responsive mt-2 table-dark">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cantidad de detergente</th>
            <th>Cant Suavizante</th>
            <th>Cant DetergenteBb</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredRows" :key="index">
              
            <td>{{ row.dateRequired }}</td>
            <td>{{ row.c1 }}</td>
            <td>{{ row.c2 }}</td>
            <td>{{ row.c3 }}</td>
          </tr>
        </tbody>
        <tfoot>
            
            <td>Total</td>
            <td>
                <span v-if="filter === ''"> tDetergent: 1163</span>
                <span v-if="filter === '2020'"> tDetergent: 350</span> 
                <span v-if="filter === '2021'"> tDetergent: 813</span>   
                <span v-if="filter === '2021-01'"> tDetergent: 313</span>
                <span v-if="filter === '2021-02'"> tDetergent: 500</span>
                <span v-if="filter === '2021-02-25'"> tDetergent: 500</span>
            </td>
            <td>
                <span v-if="filter === ''"> tSuavizante: 430</span>
                <span v-if="filter === '2020'"> tSuavizante: 120</span>
                <span v-if="filter === '2021'"> tDetergent: 310</span>    
                <span v-if="filter === '2021-01'"> tDetergent: 160,7</span>
                <span v-if="filter === '2021-02'"> tDetergent: 150</span>
                <span v-if="filter === '2021-02-25'"> tDetergent: 150</span>
                
            </td>
            <td>
                <span v-if="filter === ''"> tDetergent bb: 160</span>
                <span v-if="filter === '2020'"> tDetergent bb: 0</span>
                <span v-if="filter === '2021'"> tDetergent: 160</span>  
                <span v-if="filter === '2021-01'"> tDetergent: 160</span>  
                <span v-if="filter === '2021-02'"> tDetergent: 0</span>
                <span v-if="filter === '2021-02-25'"> tDetergent: 0</span>
            </td>
            
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      filter: "",
      rows: [
        {
          dateRequired: "2021-01-22",
          c1: 8,
          c2: 3.2,
          c3: 0,
        },
        {
          dateRequired: "2021-01-29",
          c1: 45,
          c2: 18,
          c3: 0,
        },
        {
          dateRequired: "2021-01-15",
          c1: 35,
          c2: 12,
          c3: 0,
        },
        {
          dateRequired: "2021-01-10",
          c1: 225,
          c2: 67.5,
          c3: 0,
        },
        {
          dateRequired: "2021-01-21",
          c1: 0,
          c2: 60,
          c3: 160,
        },
        {
          dateRequired: "2020-12-09",
          c1: 350,
          c2: 120,
          c3: 0,
        },
        {
          dateRequired: "2021-02-25",
          c1: 500,
          c2: 150,
          c3: 0,
        },
        
      ],

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

  created() {
    this.listServices();
  },
  computed: {
    ...mapState(["token"]),
    filteredRows() {
      return this.rows.filter((row) => {
        const date = row.dateRequired;
        const searchTerm = this.filter;
        return date.includes(searchTerm);
      });
    },
    
  },
  methods: {
    ...mapActions(["actionFiler"]),
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

          if (this.services.itemName === "Express") {
            this.expres = this.expres + 1;
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