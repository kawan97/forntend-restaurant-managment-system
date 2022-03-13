<template>
  <div class="text-white">
    <h1>Order On Table {{ this.$route.params.tableid }}</h1>
    <div class="container text-black">
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <div v-if="order.length == 1" class="row text-white">
        Order id= {{ this.order[0]["id"] }}
        <div v-if="this.order[0]['suborderorder'].length > 0">
          <ul v-for="subs in this.order[0]['suborderorder']" :key="subs.id">
            <li>
              Sub order :{{ subs.id }} ,and Status : {{ subs.status }}
              <div v-if="subs.status == 'ordering'">
                <button class="btn btn-red">Add Item To this sub order</button>
              </div>
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
          <button
            v-on:click="addsuborder(this.order[0]['id'])"
            class="btn btn-darkblue"
          >
            Add sub order to this order
          </button>
        </div>
      </div>
      <div v-if="loading == false && order.length == 0" class="row">
        <button v-on:click="addorder" class="btn btn-darkblue">
          <span v-if="btnloading" class="spinner-border spinner-border-sm"></span>
          Add Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Card from '@/components/Card.vue'
import { URL } from "../store/const.js";

export default {
  name: "OrderView",
  data: function () {
    return {
      loading: true,
      btnloading:false,
      order: [],
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
  },
  components: {},
  methods: {
    addsuborder: function (orderid) {
      console.log("create sub order :D :" + orderid);
    },
    addorder: async function () {
      this.btnloading=true
      var mydata=JSON.stringify({ tableid: this.$route.params.tableid})
      // console.log("create  order :D :" + this.$route.params.tableid);
      await fetch(URL + "api/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.$store.getters.user["access"],
        },
        body: mydata,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          }
          if (data.success) {
            this.order = [];
            this.order.push(data.data)
            // console.log(this.order[0])
          }
          if (data.detail) {
            // this.$router.push({ name: "home" });
            alert(data.detail)
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
