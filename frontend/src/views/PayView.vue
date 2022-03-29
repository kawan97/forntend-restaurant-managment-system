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
        <h4>Order id= {{ this.order[0]["id"] }}</h4>

        <div v-if="this.order[0]['suborderorder'].length > 0">
          <ul
            v-for="(subs, indexofsub) in this.order[0]['suborderorder']"
            :key="subs.id + 'asa'"
          >
            <li
              class="text-start"
              :class="{ 'text-success': subs.status != 'ordering' }"
            >
              Sub order :{{ subs.id }} ,and Status : {{ subs.status }}
              <!-- table -->
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in subs['orderitemsuborder']"
                    :key="item.id"
                  >
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.SubItem["name"] }}</td>
                    <td>{{ item.SubItem["item_price"] }}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                    <th scope="col">{{ this.sumofsub[indexofsub] }}</th>
                  </tr>
                </thead>
              </table>
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
          <br />
          <button v-on:click="getreport" class="btn btn-success mt-2">
            Get Report
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
import { URL, WSURL } from "../store/const.js";

export default {
  name: "PayView",
  async beforeCreate() {
    if (this.$store.getters.user["role"] != "admin") {
      this.$store.dispatch({ type: "logout" });
    }
  },
  data: function () {
    return {
      loading: true,
      btnloading: false,
      order: [],
      sumofsub: [],
      totalsum: 0,
      subbtnloading: false,
      ws: null,
    };
  },
  created() {
    this.ws = new WebSocket(WSURL);
    var self = this;
    this.ws.onmessage = function (e) {
      var data = JSON.parse(e.data);
      if (data.username != self.$store.getters.user["username"]) {
        //check event
        if (data.event == "tablestatuschange") {
          console.log("now table status changed");
          // console.log(data);
          // console.log(self.$store.getters.table.length);
          if (
            self.$store.getters.table &&
            self.$store.getters.table.length > 0
          ) {
            var newarray = self.$store.getters.table;
            var map1 = newarray.map((x) => {
              if (x.id == data.data.id) {
                x.status = data.data.status;
                return x;
              } else {
                return x;
              }
            });
            // console.log(map1);
            self.$store.dispatch({
              type: "setewtable",
              payload: map1,
            });
          }
        } else if (data.event == "orderstatuschange") {
          console.log("now order status changed");
        } else if (data.event == "suborderstatuschange") {
          console.log("now suborder status changede");
          if (data.data.data.Table.id == self.$route.params.tableid) {
            // self.order["0"].suborderorder[
            //   self.order["0"].suborderorder.length - 1
            // ] = data.data.data;
            var newsubs = self.order["0"].suborderorder;
            var map1 = newsubs.map((x) => {
              if (x.id == data.data.data.id) {
                return data.data.data;
              } else {
                return x;
              }
            });
            self.order["0"].suborderorder = [];
            self.order["0"].suborderorder = map1;
          }
        } else if (data.event == "orderiscreated") {
          console.log("now order is created");
          // console.log(data)
          if (data.data.data.Table.id == self.$route.params.tableid) {
            self.order = [];
            self.order.push(data.data.data);
            self.updatesum();
          }
        } else if (data.event == "suborderiscreated") {
          console.log("now suborder is created");
          if (data.data.data.Table.id == self.$route.params.tableid) {
            self.order["0"].suborderorder.push(data.data.data);
          }
          self.updatesum();
        } else if (data.event == "additemtosuborder") {
          console.log("now add item to suborder");
          // console.log(data.data.data)
          if (data.data.data.data.Table == self.$route.params.tableid) {
            self.order["0"]["suborderorder"][
              data.data.indexof
            ].orderitemsuborder.push(data.data.data.data);
            self.updatesum();
          }
        }
        //end check if
      }
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
        //permission check
        if (data.permission) {
          alert(data.permission);
          if (data.role == "chef") {
            this.$router.push({
              name: "suborder",
            });
          }
          if (data.role == "waiter") {
            this.$router.push({
              name: "waitersuborder",
            });
          }
          if (data.role == "admin" || data.role == "captain") {
            this.$router.push({
              name: "home",
            });
          }
        }
        //permission check
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
  methods: {
    getreport: function () {
      var myport=window.location.port
      var myhostname=window.location.hostname
      var finalurl=myhostname+':'+myport
      // console.log(myhostname+':'+myport)
      var token = this.$store.getters.user["access"];
      window.open(URL +'finalreport/'+ this.order[0].id + "/" + token+'/'+finalurl, "_blank");
    },
    updatesum: function () {
      this.sumofsub = [];
      this.totalsum = 0;
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
          //permission check
          if (data.permission) {
            alert(data.permission);
            if (data.role == "chef") {
              this.$router.push({
                name: "suborder",
              });
            }
            if (data.role == "waiter") {
              this.$router.push({
                name: "waitersuborder",
              });
            }
            if (data.role == "admin" || data.role == "captain") {
              this.$router.push({
                name: "home",
              });
            }
          }
          //permission check
          if (data.error) {
            alert(data.error);
          }
          if (data.payed) {
            this.loading = false;
            alert(data.detail);
          }
          if (data.success) {
            this.loading = false;
            var wsdata = {
              value: { id: this.$route.params.tableid, status: "empty" },
              event: "tablestatuschange",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
            var wsdata = {
              value: { id: this.$route.params.tableid, status: "payed" },
              event: "orderstatuschange",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
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
