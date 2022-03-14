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
            class="btn btn-darkblue"
          >
            <span
              v-if="btnloading"
              class="spinner-border spinner-border-sm"
            ></span>
            Add sub order to this order
          </button>
        </div>
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
              <div v-if="subs.status == 'ordering'">
                <button
                  v-if="subs['orderitemsuborder'].length>0"
                  v-on:click="orderstatuschange(subs.id,indexofsub)"
                  class="btn btn-darkblue"
                >
                  Send this sub order to chef
                </button>
                <div>please Add Food to your sub order</div>
                <div
                  v-for="foodtype in this.$store.getters.food"
                  :key="foodtype.id + 'sss'"
                >
                  <div>-type: {{ foodtype.name }}</div>
                  <ul
                    v-for="itemfood in foodtype.subitem"
                    :key="itemfood.id + 'asas'"
                  >
                    {{
                      itemfood.name
                    }}|{{
                      itemfood.item_price
                    }}
                    <button
                      v-on:click="
                        additemtosuborder(subs.id, itemfood.id, indexofsub)
                      "
                      class="btn btn-red"
                    >
                      Add
                    </button>
                  </ul>
                </div>
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
            <span
              v-if="btnloading"
              class="spinner-border spinner-border-sm"
            ></span>
            Add sub order to this order
          </button>
        </div>
      </div>
      <div v-if="loading == false && order.length == 0" class="row">
        <button v-on:click="addorder" class="btn btn-darkblue">
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
import { URL } from "../store/const.js";

export default {
  name: "OrderView",
  data: function () {
    return {
      loading: true,
      btnloading: false,
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
    // now fetch all foods
    if (this.$store.getters.food == "") {
      this.$store.dispatch({ type: "getfood" });
    }

    //end before create
  },
  components: {},
  methods: {
    orderstatuschange:async function(suborderid,indexof){
      this.loading = true;
      var mydata = JSON.stringify({ suborderstatus: 'sendingtochef' });
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
          if (data.error) {
            alert(data.error);
          }
          if (data.success) {
            this.loading = false;
            this.order[0]["suborderorder"][indexof].status='sendingtochef'
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
      console.log(suborderid)
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
          if (data.error) {
            alert(data.error);
          }
          if (data.success) {
            this.loading = false;
            
            this.order[0]["suborderorder"][myindex].orderitemsuborder.push(data.data)
            

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
      this.btnloading = true;
      await fetch(URL + "api/suborder/" + orderid + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.$store.getters.user["access"],
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.order[0].suborderorder.push(data.data);
            this.btnloading = false;
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
          if (data.error) {
            alert(data.error);
          }
          if (data.success) {
            this.order = [];
            this.order.push(data.data);
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
