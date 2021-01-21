<template>
  <div class="container">
      <h1>Login</h1>
      <form @submit.prevent="login">
          <input type="email" placeholder="Email" class="form-control my-3" v-model="user.userEmail">
          <input type="text" placeholder="Password" class="form-control my-3" v-model="user.password">
            <b-button class="btn-block" type="submit">Ingresar</b-button>
      </form>

      <div class="mt-5" v-if="mensaje != ''">
          <p>{{mensaje}}</p>
      </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data() {
        return {
            user: {userEmail: '', password: ''},
            mensaje: ''
        }
    },
    methods: {
        ...mapActions(['guardarUsuario']),
        login(){
            //console.log(this.user);
            this.axios.post('/login', this.user)
            .then(res => {
                console.log(res.data);
                const token = res.data.token;
                this.guardarUsuario(token);
            })
            .catch(err => {
                console.log(err.response);
                this.mensaje = err.response.data.mensaje
            } )
        }
    },
}
</script>

<style>

</style>