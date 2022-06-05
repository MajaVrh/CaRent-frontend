<template>
  <v-container class="mt-15 mb-15">
    <h1 class="mb-10">Personal details</h1>

    <v-row>
      <v-col>
        <v-text-field color="orange" label="name"></v-text-field>
        <v-text-field color="orange" label="surname"></v-text-field>
        <v-text-field color="orange" label="email"></v-text-field>
        <v-text-field color="orange" label="age"></v-text-field>
        <v-text-field color="orange" label="username"></v-text-field>
        <v-text-field color="orange" label="postal code"></v-text-field>
        <v-text-field color="orange" label="city"></v-text-field>
        <v-text-field color="orange" label="Country"></v-text-field>
        <v-btn width="180" color="#153040" class="white--text text-capitalize mt-5">done</v-btn>
      
      </v-col>
      
      <v-row class>
        <v-col align="center" justify="center">
          <v-icon size="300" color="grey lighten-1"> mdi-account-circle </v-icon>
        <v-col>
          <v-btn width="180" color="#153040" class="white--text text-capitalize">Settings</v-btn>
          <v-col>
            <v-btn width="180" color="#153040" class="white--text text-capitalize" >Delete account</v-btn>
          </v-col>
        </v-col>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>