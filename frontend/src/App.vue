<template>
  <div id="app">
    <div>
      <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand href="#">LAVAROPA ONLINE</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" v-if="!estaActivo">Home</b-nav-item>
            <b-nav-item to="/about" v-if="!estaActivo">About</b-nav-item>
            <b-nav-item to="/login" v-if="!estaActivo">Log In</b-nav-item>
            <b-nav-item to="/service-list" v-if="estaActivo"
              >Solicitar Servicios |
            </b-nav-item>
            <b-nav-item to="/services" v-if="estaActivo"
              >Servicios Solicitados |
            </b-nav-item>
            <b-nav-item to="/stocks" v-if="estaActivo">Stock | </b-nav-item>
            <b-nav-item to="/reports" v-if="estaActivo">Reportes |</b-nav-item>
            <b-nav-item to="/date-reports" v-if="estaActivo">Reportes Fechas</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right v-if="estaActivo">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>Options</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="cerrarSesion()"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["cerrarSesion", "leerToken"]),
  },
  computed: {
    ...mapGetters(["estaActivo"]),
  },
  created() {
    this.leerToken();
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #f5f4f4;
  background-color: #0a043c;
  height: 100%;
}
</style>
