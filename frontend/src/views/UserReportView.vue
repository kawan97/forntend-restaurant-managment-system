<template>
  <div class="text-white">
    <h1>Get All action By Date And User</h1>
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
      <div v-if="users?.length != 0" class="mt-3">
        <small class="form-text text-muted">Please select user.</small>
        <select v-model="userid" class="form-select">
          <option
            v-for="singleuser in this.users"
            :key="singleuser.id + 'user'"
            :value="singleuser.id"
          >
            {{ singleuser.username }}
          </option>
        </select>
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
        <div v-if="btnclick && actions['0'].length == 0" class="mt-4 row">
          Sorry he/she havent ay action in those days
        </div>
        <div v-if="btnclick && actions['0'].length > 0" class="mt-4 row">
          <!-- table -->
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Sub Order</th>
                <th scope="col">User</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(action, indof) in actions['0']" :key="indof">
                <th scope="row">{{ action.id }}</th>
                <td>
                  <router-link
                    :to="{
                      name: 'singlesuborder',
                      params: { suborderid: action.SubOrder },
                    }"
                    >sub {{ action.SubOrder }}</router-link
                  >
                </td>
                <td>{{ action.User.username }}</td>
                <td>{{ action.type }}</td>
                <td>{{ formatdate(action.date) }}</td>
              </tr>
            </tbody>
            <thead></thead>
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
      actions: [],
      users: [],
      userid: "",
      btnclick: false,
      enddate: "",
      loading: false,
      startdate: "",
    };
  },
  async beforeCreate() {
    this.loading = true;
    var myurl = URL + "api/users/";
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
          this.users = [];
          this.users = data.data;
          // console.log(this.users);
          this.loading = false;
        }

        
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
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  },
  methods: {
    formatdate: function (date) {
      if (date) {
        return moment(String(date)).format("YYYY-MM-DD hh:mm");
      }
    },
    getreport: async function () {
      this.loading = true;
      if (this.startdate && this.enddate && this.userid) {
        // console.log(this.startdate + " and " + this.enddate);
        var myurl =
          URL +
          "api/useraction/" +
          this.startdate +
          "/" +
          this.enddate +
          "/" +
          this.userid +
          "/";
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
              this.actions = [];
              this.actions["0"] = data.data;
              // console.log(this.actions['0'])
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
  },
};
</script>
