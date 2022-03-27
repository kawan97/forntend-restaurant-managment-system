<template>
    <div class="container-fluid">
    <div class="row flex-row flex-nowrap text-white">
        <div class="col-3">
           ..
        </div>
        <div class="col-3">
           ..
        </div>     <div class="col-3">
           ..
        </div>     <div class="col-3">
           ..
        </div>     <div class="col-3">
           ..
        </div>     <div class="col-3">
           ..
        </div>     <div class="col-3">
           ..
        </div>     <div class="col-3">
           ..
        </div>
        <div class="col-3">
           ..
        </div>
        <div class="col-3">
           ..
        </div>
        <div class="col-3">
           ..
        </div>
        <div class="col-3">
           ..
        </div>
        <div class="col-3">
           ..
        </div>
        <div class="col-3">
           ..
        </div>
    </div>
</div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "WrapAround",
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
});
</script>
<style scoped>
.bg-purple {
  background-color: #703504;
  color: #ffffff;
  /* fbe766 */
}
.btn-outline-yallow {
  color: #fbe766;
  border-color: #fbe766;
}
.btn-outline-yallow:hover {
  color: #703504;
  background-color: #fbe766;
  border-color: #fbe766;
}
/* The heart of the matter */

.horizontal-scrollable > .row {
  overflow-x: auto;
  white-space: nowrap;
}

.horizontal-scrollable > .row > .col-xs-4 {
  display: inline-block;
  float: none;
}
/* Decorations */

.col-xs-4 {
  color: white;
  font-size: 24px;
  padding-bottom: 20px;
  padding-top: 18px;
}

.col-xs-4:nth-child(2n + 1) {
  background: green;
}

.col-xs-4:nth-child(2n + 2) {
  background: black;
}
</style>
