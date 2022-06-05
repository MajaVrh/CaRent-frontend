<template>
  <v-container>
      
      <div v-for="i in 10" :key="i">
        <your-car :carName="i" :isLast="i == 10"/>
      </div>
  </v-container>
</template>

<script>
import yourCar from '@/components/yourCar'
export default {
components: {
    yourCar
}
}
</script>

<style>

</style>