<template>
  <v-container v-if="rentInfo && rentInfo.carInfo.length > 0">
     
      <div v-for="(rent, i) in rentInfo.carInfo" :key="rent._id">
        <your-car :carName="rent.car.carName" :isLast="i == rentInfo.carInfo.length - 1" :carInfo="rent"/>
      </div>
    
  </v-container>
  <v-container v-else>
    no cars :)
  </v-container>
</template>

<script>
import axios from 'axios'
import yourCar from '@/components/yourCar'
export default {
name: "myRents",
data(){
  return {
    rentInfo: null
  }
},
components: {
    yourCar
},
methods: {

  async fetchRents(){
    try {
      const res = await axios.get("http://localhost:8000/user/rent")
      this.rentInfo = res.data
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  },
},

mounted(){
  this.fetchRents()
  
}

}
</script>

<style>

</style>