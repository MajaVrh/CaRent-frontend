<template>
  <v-container class="py-10 px-10">
      <h1 class="mb-15  text-h3" style="font-family: 'Jockey One', sans-serif !important;">Contact us</h1>
        <v-row justify="center" align="center">
            <v-col justify="center" align="center">
                <v-card width="1250" class="px-15 py-10 mb-15" color="grey lighten-3">
                  <v-text-field label="Name" name="firstName" color="#153040" class="mx-15" ></v-text-field>
                  <v-text-field label="Email" name="email" color="#153040" class="mx-15"></v-text-field>
                  <v-textarea outlined name="body" label="Write a message" color="#153040" height="200" class="mx-15 my-8"></v-textarea>
                  <v-btn class="text-capitalize white--text" color="orange" width="250">send</v-btn>
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
name: "contact",
data(){
return{

}
}
}
</script>

<style>

</style>