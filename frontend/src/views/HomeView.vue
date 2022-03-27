<template>
  <div class="text-white">
    <h1>Tables For {{ roletype }}</h1>
    <div class="container text-black">
      <div class="row">
        <div
          v-for="singletb in this.$store.getters.table"
          :key="singletb.id"
          class="col-12 col-lg-4 col-xl-4 col-md-6 mb-4"
        >
          <Card
            :type="roletype"
            :tablename="singletb['name']"
            :status="singletb['status']"
            :id="singletb['id']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Card from "@/components/Card.vue";
import { WSURL } from "../store/const.js";
export default {
  name: "HomeView",
  data: function () {
    return {
      roletype: this.$store.getters.user["role"],
      ws: null,
    };
  },
  async beforeCreate() {
    if (this.$store.getters.user["role"] != "admin" && this.$store.getters.user["role"] != "captain") {
      this.$store.dispatch({ type: "logout" });
    }
    await this.$store.dispatch({ type: "getalltable" });
  },
  components: {
    Navbar,
    Card,
  },
  created() {
    var self = this;
    this.ws = new WebSocket(WSURL);
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
            // console.log("sssssssssssssssssss");
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
        } else if (data.event == "orderiscreated") {
          console.log("now order is created");
        } else if (data.event == "suborderiscreated") {
          console.log("now suborder is created");
        } else if (data.event == "additemtosuborder") {
          console.log("now add item to suborder");
        }
        //end check if
      }
    };
  },
  methods: {
    sendmsg: function () {
      //    var data={"value":'myvalue','event':'suborderstatuschange'}
      // this.ws.send(JSON.stringify(data));
    },
  },
};
</script>
