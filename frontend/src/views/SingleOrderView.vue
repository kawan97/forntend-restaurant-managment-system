<template>
  <div class="text-white">
    <h1>Order id: {{ this.$route.params.orderid }}</h1>
    <div class="container text-black">
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <div v-if="order?.length == 1" class="row text-white">
        Order id= {{ this.order[0]["id"] }}

        <div v-if="this.order[0]['suborderorder'].length > 0">
          <ul
            v-for="subs in this.order[0]['suborderorder']"
            :key="subs.id + 'asa'"
          >
            <li :class="{ 'text-success': subs.status != 'ordering' }">
              Sub order :{{ subs.id }} ,and Status : {{ subs.status }}
              <div
                v-for="(item, index) in subs['orderitemsuborder']"
                :key="item.id"
              >
                {{ index + 1 }} : {{ item.SubItem["name"] }} :
                {{ item.SubItem["item_price"] }}
              </div>
            </li>
          </ul>
        </div>
        <div v-if="this.order[0]['suborderorder'].length == 0">
          <div>You Dont Have Sub Order</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Card from '@/components/Card.vue'
import { URL } from "../store/const.js";

export default {
  name: "SingleSubOrderView",
  data: function () {
    return {
      loading: true,
      order: null,
    };
  },
  async beforeCreate() {
    if (!parseInt(this.$route.params.orderid)) {
      return null;
    }
    await fetch(URL + "api/orders/" + this.$route.params.orderid + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.getters.user["access"],
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail) {
          alert(data.detail);
        } else {
          // console.log("Success:", data.length);
          if (data.success) {
            this.order = null;
            this.order = data.data;

            this.loading = false;
          }
        }
      })
      .catch((error) => {
        alert('this is is not exist')
        // console.error("Error:", error);
      });
    // now fetch all foods


    //end before create
  },
};
</script>
<style scoped>
.btn-red {
  color: white;
  background: #fc5404;
  border-left-color: #fc5404;
}
.btn-red:hover {
  color: rgb(17, 15, 15);
  background: #d34605;
  border-left-color: #d34605;
}
.btn-darkblue {
  color: white;
  background: #073b4c;
  border-left-color: #073b4c;
}
.btn-darkblue:hover {
  color: #d34605;
  background: #052631;
  border-left-color: #052631;
}
</style>
