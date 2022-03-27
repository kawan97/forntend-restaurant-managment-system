<template>
  <div class="text-white">
    <h1>Get All Equipment By Date</h1>
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
        Please select start date , End date , User And click Get Report
      </div>
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <!-- start -->
      <div v-if="!loading">
        <div v-if="btnclick && equipment['0'].length == 0" class="mt-4 row">
          Sorry we havent any equipment in those days
        </div>
        <div v-if="btnclick && equipment['0'].length > 0" class="mt-4 row">
          <!-- table -->
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">User</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(equip, indof) in equipment['0']" :key="indof">
                <th scope="row">{{ equip.id }}</th>
                <td>{{ equip.name }}</td>
                <td>{{ equip.User.username }}</td>
                <td>{{ equip.total }}</td>
                <td>{{ formatdate(equip.date) }}</td>
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
  name: "EquipmentsReportView",
  data: function () {
    return {
      roletype: this.$store.getters.user["role"],
      equipment: [],
      btnclick: false,
      enddate: "",
      loading: false,
      startdate: "",
      sum: 0,
    };
  },
    async beforeCreate() {
    if (this.$store.getters.user["role"] != "admin") {
      this.$store.dispatch({ type: "logout" });
    }
  },
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
          URL + "api/equipments/" + this.startdate + "/" + this.enddate + "/";
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
            }
            if (data.success) {
              this.equipment = [];
              this.equipment["0"] = data.data;
              this.updatesum()
              // console.log(this.equipment['0'])
              this.btnclick = true;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(error);
          });
      } else {
        alert("start date or end date or user are empty");
      }
      this.loading = false;
    },
    updatesum: function () {
      this.sum = 0;
      var sumofequipment = 0;
      for (var i = 0; i < this.equipment[0].length; i++) {
        var sumofequipment = sumofequipment+parseInt(this.equipment[0][i].total);
      }
      this.sum=sumofequipment

    },
  },
};
</script>
