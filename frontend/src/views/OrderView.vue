<template>
  <div class="row text-white ">
    <h1>Order On Table {{ this.$route.params.tableid }}</h1>
    <div class="container text-black">
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <div v-if="order.length == 1" class="row text-white">
        <h4>Order id= {{ this.order[0]["id"] }}</h4>
        <div
          v-if="
            order[0] &&
            order[0].suborderorder.length > 0 &&
            order[0].suborderorder[order[0].suborderorder.length - 1].status !=
              'ordering'
          "
        >
          <div>Add another sub order to this order</div>
          <button
            v-on:click="addsuborder(this.order[0]['id'])"
            class="btn btn-outline-info"
          >
            <span
              v-if="subbtnloading"
              class="spinner-border spinner-border-sm"
            ></span>
            Add sub order to this order
          </button>
        </div>
        <div v-if="this.order[0]['suborderorder'].length > 0">
          <div
            v-for="(subs, indexofsub) in this.order[0]['suborderorder']"
            :key="subs.id + 'asa'"
          >
            <div
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
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
              </table>
              <div v-if="subs.status == 'ordering'">
                <button
                  v-if="subs['orderitemsuborder'].length > 0"
                  v-on:click="orderstatuschange(subs.id, indexofsub)"
                  class="btn btn-outline-danger mb-4"
                >
                  Send this sub order to chef
                </button>
                <div>please Add Food to your sub order</div>
                <div
                  v-for="foodtype in this.$store.getters.food"
                  :key="foodtype.id + 'sss'"
                >
                  <div class="h2">type: {{ foodtype.name }}</div>
                  <div class="row ">
                    <div class="col-12 col-lg-4 mx-2 my-2"
                      v-for="itemfood in foodtype.subitem"
                      :key="itemfood.id + 'assafr'"
                    >
                      <!-- cards -->
                      <div class="card " style="min-width: 200px;">
                        <div class="card-body bg-purple">
                          <h5 class="card-text">{{ itemfood.name }}</h5>
                          <h3 class="card-text">{{ itemfood.item_price }}</h3>
                          <button
                            v-on:click="
                              additemtosuborder(
                                subs.id,
                                itemfood.id,
                                indexofsub
                              )
                            "
                            class="btn btn-outline-warning"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <!-- cards -->
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.order[0]['suborderorder'].length == 0">
          <div>You Dont Have Sub Order</div>
          <button
            v-on:click="addsuborder(this.order[0]['id'])"
            class="btn btn-outline-info"
          >
            <span
              v-if="btnloading"
              class="spinner-border spinner-border-sm"
            ></span>
            Add sub order to this order
          </button>
        </div>
      </div>
      <div v-if="loading == false && order.length == 0" class="row">
        <button v-on:click="addorder" class="btn btn-outline-success">
          <span
            v-if="btnloading"
            class="spinner-border spinner-border-sm"
          ></span>
          Add Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Card from '@/components/Card.vue'
import { URL, WSURL } from "../store/const.js";
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
export default defineComponent({
  name: "OrderView",
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  data: function () {
    return {
      loading: true,
      btnloading: false,
      order: [],
      subbtnloading: false,
      ws: null,
    };
  },
  async beforeCreate() {
    if (
      this.$store.getters.user["role"] != "admin" &&
      this.$store.getters.user["role"] != "captain"
    ) {
      this.$store.dispatch({ type: "logout" });
    }
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
    // now fetch all foods
    if (this.$store.getters.food == "") {
      this.$store.dispatch({ type: "getfood" });
    }

    //end before create
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
          // console.log(data)
          if (data.data.id == self.$route.params.tableid) {
            if (data.data.status == "payed") {
              self.order = [];
            }
          }
        } else if (data.event == "suborderstatuschange") {
          console.log("now suborder status changede");
          // console.log(data.data.data.id)
          // console.log(data)
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
          }
        } else if (data.event == "suborderiscreated") {
          console.log("now suborder is created");
          if (data.data.data.Table.id == self.$route.params.tableid) {
            self.order["0"].suborderorder.push(data.data.data);
          }
        } else if (data.event == "additemtosuborder") {
          console.log("now add item to suborder");
          // console.log(data.data.data)
          if (data.data.data.data.Table == self.$route.params.tableid) {
            self.order["0"]["suborderorder"][
              data.data.indexof
            ].orderitemsuborder.push(data.data.data.data);
          }
        }
        //end check if
      }
    };
  },
  methods: {
    orderstatuschange: async function (suborderid, indexof) {
      this.loading = true;
      var mydata = JSON.stringify({ suborderstatus: "sendingtochef" });
      await fetch(URL + "api/suborderupdate/" + suborderid + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.$store.getters.user["access"],
        },
        body: mydata,
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
          if (data.success) {
            this.loading = false;
            this.order[0]["suborderorder"][indexof].status = "sendingtochef";
            var wsdata = {
              value: data,
              event: "suborderstatuschange",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
            // console.log(data);
          }
          if (data.detail) {
            this.$router.push({ name: "home" });
            alert(data.detail);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // console.log(suborderid)
    },
    additemtosuborder: async function (suborderid, itemid, myindex) {
      this.loading = true;
      // console.log("add " + itemid + " to this sub order id " + suborderid);
      var mydata = JSON.stringify({ subitemid: itemid });
      // console.log("create  order :D :" + this.$route.params.tableid);
      await fetch(URL + "api/orderitem/" + suborderid + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.$store.getters.user["access"],
        },
        body: mydata,
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
          if (data.success) {
            this.loading = false;

            this.order[0]["suborderorder"][myindex].orderitemsuborder.push(
              data.data
            );
            // console.log(data)
            var wsdata = {
              value: { data: data, indexof: myindex },
              event: "additemtosuborder",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
            // console.log(this.order[0]["suborderorder"][myindex].orderitemsuborder);
          }
          if (data.detail) {
            this.$router.push({ name: "home" });
            alert(data.detail);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // this.$router.push({ name: "items" , params: { suborderid: suborderid }});
    },
    addsuborder: async function (orderid) {
      this.subbtnloading = true;
      await fetch(URL + "api/suborder/" + orderid + "/", {
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
          if (data.success) {
            this.order[0].suborderorder.push(data.data);
            this.subbtnloading = false;
            var wsdata = {
              value: data,
              event: "suborderiscreated",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
          }
          if (data.detail) {
            this.$router.push({ name: "home" });
            alert(data.detail);
          }
        })
        .catch((error) => {
          this.btnloading = false;
          console.error("Error:", error);
        });
    },
    addorder: async function () {
      this.btnloading = true;
      var mydata = JSON.stringify({ tableid: this.$route.params.tableid });
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
          if (data.success) {
            this.order = [];
            this.order.push(data.data);
            this.btnloading = false;
            var wsdata = {
              value: data,
              event: "orderiscreated",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
            var wsdata = {
              value: { id: this.$route.params.tableid, status: "reserved" },
              event: "tablestatuschange",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
            // console.log(this.order[0])
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
});
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
