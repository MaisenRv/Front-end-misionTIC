<template>

    <div class="greetings">
        <h1> <span>{{username}}</span> ¡Bienvenido a Tu hoja de vida!</h1>
    </div>

</template>

<script>

export default {
    name: "Home",

    data: function(){
        return {
            username: localStorage.getItem('username') || "none"
        }
    }
}

</script>

<style>
    .greetings{
        margin: 30px 0px;
        padding: 0%;
        height: 100%;
        width: 100%;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .greetings h1{
        font-size: 50px;
        color: #283747;
    }

    .greetings span{
        color: crimson;
        font-weight: bold;
    }
</style>