<template>
  <div class=" text-white">
    <h1>Tables For Captain</h1>
    <div class="container text-black">
      <div class="row">
        <div v-for="singletb in this.$store.getters.table" :key="singletb.id" class="col-12 col-lg-4 col-xl-4 col-md-6 mb-4">
        <Card :type='roletype' :tablename='singletb["name"]' :status="singletb['status']" :id='singletb["id"]' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'

export default {
  name: 'HomeView',
    data: function () {
    return {
      roletype: this.$store.getters.user["role"],
      
    };
  },
    async beforeCreate() {
    await this.$store.dispatch({type: 'getalltable'})
    
  },
  components: {
    Navbar,
    Card
  },

}
</script>
