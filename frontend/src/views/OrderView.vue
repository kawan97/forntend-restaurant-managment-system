<template>
  <div class=" text-white">
    <h1>Order On Table {{this.$route.params.tableid}}</h1>
    <div class="container text-black">
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Card from '@/components/Card.vue'

export default {
  name: 'OrderView',
    async beforeCreate() {
    // await this.$store.dispatch({type: 'getalltable'})
    
  },
  components: {
  },

}
</script>
