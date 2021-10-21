<template>

    <div v-if="loaded" class="information">
        <h1>Información de su hoja de vida</h1>
        <h2>Nombre: <span>{{name}}</span></h2>
        <h2>Años de experiencia: <span>{{Agnos_experiencia}}</span></h2>
        <h2>Profesion: <span>{{profesion}}</span></h2>
        <h2>Descripcion: <span>{{descripcion}}</span></h2>
        <h2>Correo electrónico: <span>{{email}}</span></h2>
    </div>

</template>

<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';

export default {
    name: "Account",

    data: function(){
        return {
            name: "",
            Agnos_experiencia: "",
            profesion:"",
            descripcion:"",
            email: "",
            loaded: false,
        }
    },
    methods: {
        getData: async function () {

            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();
            axios.get(`https://hvuniverisdad-be.herokuapp.com/user/${userId}/`, {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    this.name = result.data.name;
                    this.email = result.data.email;	
                    this.Agnos_experiencia = result.data.HojaDeVida.Agnos_experiencia;
                    this.profesion = result.data.HojaDeVida.profesion;
                    this.descripcion = result.data.HojaDeVida.descripcion;
                    this.loaded = true;
                    })
                .catch((e) => {
                    this.$emit('logOut');
                    console.log(e);
                });
        },
        verifyToken: function () {
            return axios.post("https://hvuniverisdad-be.herokuapp.com/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}})
				.then((result) => {
					localStorage.setItem("token_access", result.data.access);		
				})
				.catch(() => {
					this.$emit('logOut');
				});
        }
    },
    created: async function(){
        this.getData();
    },
}
</script>

<style >
.information{
    border: 2px solid white;
    background: #1A98EA;
    border-radius: 10px;
}

.information h1, .information h2{
    color:white;
    margin: 20px;
    text-transform: uppercase;
}
.information h1{
    border-bottom: white 1px solid; 
}



.information span{
    font-weight: bold;
    text-transform: capitalize;
}

</style>