<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrarse</h2>

      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" /><br />
        <input type="password" v-model="user.password" placeholder="Password" /><br />
        <input type="text" v-model="user.name" placeholder="Name" /><br />
        <input type="email" v-model="user.email" placeholder="Email" /><br />
        <input type="text" v-model="user.HojaDeVida.cedula" placeholder="Cedula" /><br />
        <input type="text" v-model="user.HojaDeVida.Agnos_experiencia" placeholder="experience years"/><br />
        <input type="text" v-model="user.HojaDeVida.profesion" placeholder="Ocupation" /><br />
        <input type="text" v-model="user.HojaDeVida.descripcion" placeholder="Description" /><br />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SignUp",
    data: function () {
        return {
        user: {
            username: "",
            password: "",
            name: "",
            email: "",
            HojaDeVida: {
              lastChangeDate: new Date().toJSON().toString(),
              cedula:"",
              Agnos_experiencia:"",
              profesion:"",
              descripcion:"",
              isActive: true,
            },
        },
        };
    },
    methods: {
    processSignUp: function () {
      axios.post("https://hvuniverisdad-be.herokuapp.com/user/", this.user, {
          headers: {},
        }).then((result) => {
          let dataSignUp = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };

          this.$emit("completedSignUp", dataSignUp);
        }).catch((error) => {
          console.log(error);
          alert("Error en el registro.");
        });
    },
  },
};
</script>

<style>

</style>
