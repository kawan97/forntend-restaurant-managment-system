<template>
  <div class="text-white">
    <h1>Pay :Order On Table {{ this.$route.params.tableid }}</h1>
    <div class="container text-black">
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <div v-if="order.length == 1" class="row text-white">
        Order id= {{ this.order[0]["id"] }}

        <div v-if="this.order[0]['suborderorder'].length > 0">
          <ul
            v-for="(subs, indexofsub) in this.order[0]['suborderorder']"
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
              <div class="text-white">
                Sum of this sub order is {{ this.sumofsub[indexofsub] }}
              </div>
            </li>
          </ul>
          <div>------</div>
          <div>Total Sum is : {{ this.totalsum }}</div>
          <button v-on:click="payorder" class="btn btn-red">
            <span
              v-if="btnloading"
              class="spinner-border spinner-border-sm"
            ></span>
            Pay It
          </button>
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
  name: "PayView",
  data: function () {
    return {
      loading: true,
      btnloading: false,
      order: [],
      sumofsub: [],
      totalsum: 0,
      subbtnloading: false,
    };
  },
  async beforeCreate() {
    await fetch(URL + "api/tables/" + this.$route.params.tableid, {
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
          if (data.length == 1) {
            this.order = data;
            this.loading = false;
          }
          if (data.length == 0) {
            // console.log("i havnt any order :(");
            this.loading = false;
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    for (var i = 0; i < this.order[0].suborderorder.length; i++) {
      var mysulen = this.order[0].suborderorder[i].orderitemsuborder.length;
      var mysub = this.order[0].suborderorder[i].orderitemsuborder;
      var sum = 0;
      for (var j = 0; j < mysulen; j++) {
        sum = sum + parseInt(mysub[j].SubItem.item_price);
      }
      this.sumofsub.push(sum);
      this.totalsum = this.totalsum + sum;
      sum = 0;
    }
  },
  components: {},
  methods: {
    payorder: async function () {
      console.log("pay it");
      this.loading = true;
      this.btnloading = true;
      await fetch(URL + "api/orderupdate/" + this.order[0]["id"] + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.$store.getters.user["access"],
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          }
          if (data.payed) {
            this.loading = false;
            alert(data.detail);
          }
          if (data.success) {
            this.loading = false;
            this.$router.push({ name: "home" });
          }
          if (data.detail) {
            this.$router.push({ name: "home" });
            alert(data.detail);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
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
