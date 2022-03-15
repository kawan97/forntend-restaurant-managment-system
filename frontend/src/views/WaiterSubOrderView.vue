<template>
  <div class="text-white">
    <h1>Sub Order For Waiter</h1>
    <div class="container text-white">
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <div v-else class="row">
        <!-- all sub order -->
        <div class="col-12 col-lg-6">
          <h4 v-if="suborder.length == 0">Now we Havent Any Suborder</h4>
          <div v-else>
            <h3>All Sub Order</h3>
            <div
              v-for="(subs, indexofsub) in this.suborder"
              :key="indexofsub + 'asa'"
            >
              <div>
                {{ indexofsub + 1 }}: suborder: {{ subs.id }} on table :{{
                  subs.Table.name
                }}
                ,order: {{ subs.Order.id }}
                <button
                  v-on:click="opensinglesuborder(subs)"
                  class="btn btn-primary"
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- all sub order -->

        <!-- open part -->
        <div class="col-12 col-lg-6">
          <h3>Single Sub Order</h3>
          <div
            v-if="singlesuborderloading"
            class="spinner-border text-danger"
          ></div>
          <div v-if="singlesuborder == false">you dont open any sub</div>
          <div v-else>
            you open sub order: {{ this.singlesuborder.id }}
            <div
              v-for="(items, indexofitem) in this.singlesuborder
                .orderitemsuborder"
              :key="indexofitem + 'asas'"
            >
              <div>{{ indexofitem + 1 }}: {{ items.SubItem.name }}</div>
            </div>
            <button
              v-on:click="orderstatuschange(singlesuborder)"
              class="btn btn-danger"
            >
              sub order served
            </button>
          </div>
        </div>
        <!-- end open part -->
      </div>
    </div>
  </div>
</template>

<script>
import { URL } from "../store/const.js";

export default {
  name: "WaiterSubOrderView",
  data: function () {
    return {
      loading: true,
      suborder: "",
      singlesuborderloading: false,
      singlesuborder: false,
    };
  },
  async beforeCreate() {
    // await this.$store.dispatch({type: 'getalltable'})
    await fetch(URL + "api/waitersuborders/", {
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
    opensinglesuborder: function (singlesuborder) {
      this.singlesuborderloading = true;
      this.singlesuborder = singlesuborder;
      this.singlesuborderloading = false;
    },
    orderstatuschange: async function (subordertoupdate) {
      this.singlesuborderloading = true;
      var mydata = JSON.stringify({ suborderstatus: "waiterserving" });
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
          if (data.error) {
            alert(data.error);
          }
          if (data.success) {
 
            this.suborder=this.suborder.filter(function (item) {
              return item.id != subordertoupdate.id;
            });
            this.singlesuborderloading = false;
            this.singlesuborder = false;
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
    },
  },
};
</script>
