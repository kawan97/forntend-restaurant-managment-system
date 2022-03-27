<template>
  <div>

    <h1 class="text-white">sssssss</h1>
    <Carousel :items-to-show="6" :wrap-around="true">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">
          <!-- cards -->
          <div class="card my-3 mx-5" style="width: 18rem">
            <div class="card-body bg-purple">
              <h3 class="card-text">Item Name {{ slide }}</h3>
              <h3 class="card-text">500</h3>
              <button class="btn btn-outline-yallow">Add</button>
            </div>
          </div>
          <!-- cards -->
        </div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
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
</style>
