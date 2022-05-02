<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="1" color="#153040" height="90" justify-center >
        <v-app-bar-nav-icon color="white" x-large ></v-app-bar-nav-icon>
        <v-app-bar-title class="text-h3 white--text text-no-wrap" style="font-family:'Jockey One', sans-serif !important;" ><div>Ca<span class="orange--text lighten-1">R</span>ent</div></v-app-bar-title>
        
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>


</style>
