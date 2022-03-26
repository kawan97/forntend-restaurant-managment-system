<template>
  <div class="text-white">
    <h1>Sub Order For Chef</h1>
    <div class="container text-white">
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <div v-else class="row">
        <!-- all sub order -->
        <div class="col">
          <h4 v-if="suborder.length == 0">Now we Havent Any Suborder</h4>
          <div v-else>
            <h3>All Sub Order</h3>

            <!-- table -->
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">number</th>
                  <th scope="col">Suborder Id</th>
                  <th scope="col">Table</th>
                  <th scope="col">Order</th>
                  <th scope="col">Open</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(subs, indexofsub) in this.suborder"
                  :key="indexofsub + 'asad'"
                >
                  <th scope="row">{{ indexofsub + 1 }}</th>
                  <td>{{ subs.id }}</td>
                  <td>{{ subs.Table.name }}</td>
                  <td>{{ subs.Order.id }}</td>
                  <td>
                    <button
                      v-on:click="opensinglesuborder(subs)"
                      type="button"
                      class="btn btn-primary"
                    >
                      Open
                    </button>
                  </td>
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
          </div>
        </div>
        <!-- all sub order -->
        <!-- open part -->
        <!-- Modal -->
        <div
          class="modal text-dark"
          :class="{ displayedclass: isActive }"
          tabindex="-1"
          id="staticBackdrop"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  sub order: {{ this.singlesuborder.id }}
                </h5>
                <button
                  v-on:click="closemodal"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  v-for="(items, indexofitem) in this.singlesuborder
                    .orderitemsuborder"
                  :key="indexofitem + 'asass'"
                >
                  <div>{{ indexofitem + 1 }}: {{ items.SubItem.name }}</div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  v-on:click="closemodal"
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  v-on:click="orderstatuschange(singlesuborder)"
                  class="btn btn-danger"
                >
                  send to Waiter
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <!-- end open part -->
      </div>
    </div>
  </div>
</template>

<script>
import { URL, WSURL } from "../store/const.js";

export default {
  name: "SubOrderView",
  data: function () {
    return {
      loading: true,
      isActive: false,
      suborder: [],
      singlesuborderloading: false,
      singlesuborder: false,
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
        if (data.event == "suborderstatuschange") {
          console.log("now suborder status changede");
          if (data.data.data.status == "sendingtochef") {
            self.suborder.push(data.data.data);
          }
        }
        //end check if
      }
    };
  },
  async beforeCreate() {
    // await this.$store.dispatch({type: 'getalltable'})
    await fetch(URL + "api/suborders/", {
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
          if (data.success) {
            this.loading = false;
            this.suborder = data.data;
            //  console.log(this.suborder[1].orderitemsuborder);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  methods: {
    closemodal: function () {
      this.isActive = false;
    },
    opensinglesuborder: function (singlesuborderr) {
      this.singlesuborderloading = true;
      this.isActive = true;

      this.singlesuborder = singlesuborderr;
      this.singlesuborderloading = false;
      // console.log(this.singlesuborder);
    },
    orderstatuschange: async function (subordertoupdate) {
      this.singlesuborderloading = true;
      var mydata = JSON.stringify({ suborderstatus: "orderisready" });
      await fetch(URL + "api/suborderupdate/" + subordertoupdate.id + "/", {
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
            this.suborder = this.suborder.filter(function (item) {
              return item.id != subordertoupdate.id;
            });
            this.singlesuborderloading = false;
            this.singlesuborder = false;
            // console.log(data);
            var wsdata = {
              value: data,
              event: "suborderstatuschange",
              username: this.$store.getters.user["username"],
            };
            this.ws.send(JSON.stringify(wsdata));
            this.closemodal();
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
.displayedclass {
  display: block;
}
.overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  display: none;
}
</style>
