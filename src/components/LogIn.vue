<template>
<div class="logIn_user">
    <div class="container_logIn_user">
      <h2>Iniciar sesión</h2>

      <form v-on:submit.prevent="processLogInUser">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />
        <input type="password" v-model="user.password" placeholder="Password" />
        <br />
        <button type="submit" >Iniciar Sesion</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",

  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    processLogInUser: function () {
        axios.post("https://hvuniverisdad-be.herokuapp.com/login/", this.user, {
          headers: {},
        }).then((result) => {
            let dataLogIn = {
                username: this.user.username,
                token_access: result.data.access,
                token_refresh: result.data.refresh,
                };

            this.$emit("completedLogIn", dataLogIn);
        }).catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
};
</script>

<style>

.logIn_user{
  border: solid 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin-top: 40px;
  text-align: center;
  color: white;
  border-radius: 10px;
  background: #1A98EA;
}

.logIn_user h2 {
  font-size: 34px;
  padding: 10px;
}
input{
  border-radius: 5px;
  margin: 10px;
  height: 25px;
  outline: none;
  border: none;
  padding: 5px;
}

button:hover{
  background: transparent;
  color: white;
  border: 1px solid white;
}

</style>
