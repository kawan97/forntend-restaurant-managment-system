<template>
        <!-- card -->
        <div class="col-12 col-lg-4 col-xl-4 col-md-6 mb-4">
          <div :class="{ empty: status==='empty',reserved:status==='reserved' }" class="card card-block">
           <h4 class="card-title text-right py-3">Table</h4>
           <img v-if="status==='empty'" src="@/assets/svg/empty1.svg" alt="">
            <img v-if="status==='reserved'" src="@/assets/svg/reserved3.svg" alt="">
            <h2 class=" mt-3 mb-3">{{this.tablename}}</h2>
           <p  v-if="status==='empty'" class="card-text">This table is Empty .</p> 
           <p  v-if="status==='reserved'" class="card-text">Sorry this table is reserved .</p> 
          </div>
        </div>
        <!-- end card -->
</template>

<script>

export default {
  name: "Card",
//     data: function () {
//     return {
//       tablename: this.tablename,
//       status:this.status,
//       id=this.id,
//     }
//   },
  props: {
    tablename: String,
    status:String,
    id:String,
  },
  methods: {
    pushToOrder:function(){

    },
  },
};
</script>
<style scoped>
.reserved{

    color: white;
    background: #FC5404;
    border-left-color: #FC5404
}
.reserved:hover{

    color: rgb(17, 15, 15);
    background: #d34605;
    border-left-color: #d34605
}
.empty{

    color: white;
    background: #073b4c;
    border-left-color: #073b4c
}
.empty:hover{

    color: #d34605;
    background: #052631;
    border-left-color: #052631
}
img{
  height:150px;
  width:100%;
}

div [class^="col-"]{
  padding-left:5px;
  padding-right:5px;
}
.card{
  transition:0.5s;
  cursor:pointer;
}
.card-title{  
  font-size:15px;
  transition:1s;
  cursor:pointer;
}
.card-title i{  
  font-size:15px;
  transition:1s;
  cursor:pointer;
  color:#ffa710
}
.card-title i:hover{
  transform: scale(1.25) rotate(100deg); 
  color:#18d4ca;
  
}
.card:hover{
  transform: scale(1.05);
  box-shadow: 10px 10px 15px rgba(0,0,0,0.3);
}
.card-text{
  height:80px;  
}

.card::before, .card::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale3d(0, 0, 1);
  transition: transform .3s ease-out 0s;
  background: rgba(255, 255, 255, 0.1);
  content: '';
  pointer-events: none;
}
.card::before {
  transform-origin: left top;
}
.card::after {
  transform-origin: right bottom;
}
.card:hover::before, .card:hover::after, .card:focus::before, .card:focus::after {
  transform: scale3d(1, 1, 1);
}
</style>