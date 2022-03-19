<template>
  <div class="text-white">
    <h1>Get All Payments By Date</h1>
    <div class="container">
      <div class="form-group">
        <label for="startdate">Start Date</label>
        <input
          v-model="startdate"
          type="date"
          class="form-control"
          id="startdate"
          placeholder="Enter start date"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Please select start date.</small
        >
      </div>
      <div class="form-group">
        <label for="enddate">End Date</label>
        <input
          v-model="enddate"
          type="date"
          class="form-control"
          id="enddate"
          placeholder="Enter end date"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Please select end date.</small
        >
      </div>
      <button class="btn btn-primary mt-2" v-on:click="getreport">
        Get Report
      </button>
      <div v-if="!btnclick" class="mt-4 row">
        Please select start date and End date and click Get Report
      </div>
      <!-- start -->
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <div v-if="!loading">
        <div v-if="btnclick && payment['0'].length == 0" class="mt-4 row">
          Sorry we havent any payment during that days
        </div>
        <div v-if="btnclick && payment['0'].length > 0" class="mt-4 row">
          <!-- table -->
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order</th>
                <th scope="col">User</th>
                <th scope="col">Total</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(paym, indof) in payment['0']" :key="indof">
                <th scope="row">{{ paym.id }}</th>
                <td>
                  <router-link
                    :to="{
                      name: 'singleorder',
                      params: { orderid: paym.Order.id },
                    }"
                    >order {{ paym.Order.id }}</router-link
                  >
                </td>
                <td>{{ paym.User.username }}</td>
                <td>{{ paym.total }}</td>
                <td>{{ formatdate(paym.date) }}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Total</th>
                <th scope="col"></th>
                <th scope="col">{{ sum }}</th>
                <th scope="col"></th>
              </tr>
            </thead>
          </table>
          <!-- end table -->
        </div>
      </div>

      <!-- end -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { URL } from "../store/const.js";
import moment from "moment";

export default {
  name: "OrderReportView",
  data: function () {
    return {
      roletype: this.$store.getters.user["role"],
      payment: [],
      btnclick: false,
      enddate: "",
      sum: 0,
      loading: false,
      startdate: "",
    };
  },
  async beforeCreate() {},
  methods: {
    formatdate: function (date) {
      if (date) {
        return moment(String(date)).format("YYYY-MM-DD hh:mm");
      }
    },
    getreport: async function () {
      this.loading = true;
      if (this.startdate && this.enddate) {
        // console.log(this.startdate + " and " + this.enddate);
        var myurl =
          URL + "api/payments/" + this.startdate + "/" + this.enddate + "/";
        // console.log(myurl)
        await fetch(myurl, {
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
            }
            if (data.success) {
              this.payment = [];
              this.payment["0"] = data.data;
              this.sumallprice();
              // console.log(this.payment['0'])
              this.btnclick = true;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(error);
          });
      } else {
        alert("start date or end date or both of them are empty");
      }
      this.loading = false;
    },
    sumallprice() {
      this.sum = 0;
      var mysum = 0;
      for (var i = 0; i < this.payment[0].length; i++) {
        mysum = mysum + parseInt(this.payment[0][i].total);
      }
      this.sum = mysum;
    },
  },
};
</script>
