<template>
  <div class=" text-white">
    <h1>Get All Payments By Date</h1>
    <div class="container">
      <label>Start Date</label>
      <input v-model="startdate" type="date">
      <label>Start Date</label>
      <input v-model="enddate" type="date">

      <button v-on:click="getreport">Get Report</button>
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'OrderReportView',
    data: function () {
    return {
      roletype: this.$store.getters.user["role"],
      payment:[],
      enddate:'',
      startdate:'',
    };
  },
    async beforeCreate() {
  },
  methods:{
    getreport:function(){
      if(this.startdate && this.enddate){
        console.log(this.startdate+" and "+this.enddate)
      }else{
        alert('start date or end date or both of them are empty')
      }
    },
  }


}
</script>
