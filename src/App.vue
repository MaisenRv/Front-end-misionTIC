<template>

  <div id="app" class="app">
    <div class="header">
    <h1>Hojas de vida</h1>
    <nav>
      <button v-if="is_auth" v-on:click="loadHome"> Inicio </button>
      <button v-if="is_auth" v-on:click="loadHojaDeVida"> Hoja de vida </button>
      <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesión </button>
      <button v-if="!is_auth" v-on:click="loadLogIn" > Iniciar Sesión </button>
      <button v-if="!is_auth" v-on:click="loadSignUp" > Registrarse </button>
    </nav>
  </div>
  <div class="main-component">
    <router-view
      v-on:completedLogIn="completedLogIn"
      v-on:completedSignUp="completedSignUp"
      v-on:logOut="logOut">
    </router-view>
  </div>
    <footer>
      <img src="./assets/mision.png" alt="">
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',

  data: function(){
      return{
        is_auth: false
      }
  },
components: {
  },
  methods:{
    verifyAuth: function() {
      this.is_auth = localStorage.getItem("isAuth") || false;
		
			if (this.is_auth == false)
        this.$router.push({ name: "logIn" });
      else
        this.$router.push({ name: "home" });
    },
    loadLogIn: function(){
      this.$router.push({name: "logIn"})
    },
    loadSignUp: function(){
      this.$router.push({name: "signUp"})
    },
    completedLogIn: function(data) {
			localStorage.setItem("isAuth", true);
			localStorage.setItem("username", data.username);
			localStorage.setItem("token_access", data.token_access);
			localStorage.setItem("token_refresh", data.token_refresh);
			alert("Autenticación Exitosa");
			this.verifyAuth();
    },
    completedSignUp: function(data) {
			alert("Registro Exitoso");
			this.completedLogIn(data);
    },

    loadHome: function() {
      this.$router.push({ name: "home" });
    },
    loadHojaDeVida: function () {
			this.$router.push({ name: "hojaDeVida" });
		},

    logOut: function () {
			localStorage.clear();
			alert("Sesión Cerrada");
			this.verifyAuth();
		},
  // },
  // created: function(){
  //   this.verifyAuth()
  }

}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body{
  background-color: #0DB8D4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Times New Roman', Times, serif;
  position: relative;
}

.header{
  width: 400px;
  height: 150px;
  flex-direction: column;
  /* background: #0FF6D7; */
  /* box-shadow: 3px 3px 7px rgba(0,0,0,.5); */
  border-radius: 5px;
  text-align: center;
  margin: 20px auto;
}
.header h1{
  color: white;
  font-size: 40px;
  font-weight: bolder;
  text-transform: uppercase;
  margin: 30px;
  
}

button{
  transition: all 1s ease;

  margin: 15px;
  border: none;
  padding: 10px;
  color: #1A98EA;
  background-color: white;
  border-radius: 10px;
}

button:hover{
  box-shadow: 3px 3px 7px rgba(0,0,0,.5);
  cursor: pointer;
  letter-spacing: 2px;
}

img{
  width: 140px;
  height: 80px;
  margin-top: 30px;
}
footer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;
  background: black;
  position: absolute;
  bottom: -250px;
  left: 0;
} 
</style>
