<template>
  <div class="text-white">
    <h1>Get Monthly Report</h1>
    <div class="container">
      <div class="form-group">
        <label for="startdate">Year</label>
        <input
          v-model="year"
          type="number"
          min="2010"
          max="2099"
          step="1"
          class="form-control"
          id="startdate"
          placeholder="Enter year"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Please select Year.</small
        >
      </div>
      <div class="form-group">
        <label for="enddate">Month</label>
        <select
          v-model="month"
          class="form-select"
          id="enddate"
          placeholder="Enter month"
        >
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <small id="emailHelp" class="form-text text-muted"
          >Please select Month.</small
        >
      </div>
      <button class="btn btn-primary mt-2" v-on:click="getreport">
        Get Report
      </button>
      <div v-if="!btnclick" class="mt-4 row">
        Please select Year , Month And click Get Report
      </div>
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <!-- start -->
      <div v-if="!loading">
        <div v-if="btnclick" class="mt-4 row">
          <!-- table -->
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Total</th>
                <th scope="col">Length</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Users Salary</td>
                <td>{{ report.user.total }}</td>
                <td>{{ report.user.length }}</td>
              </tr>
              <tr>
                <td>Equipments</td>
                <td>{{ report.equipent.total }}</td>
                <td>{{ report.equipent.length }}</td>
              </tr>
              <tr>
                <td>Payments</td>
                <td>{{ report.payment.total }}</td>
                <td>{{ report.payment.length }}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th scope="col">Profit =</th>
                <th scope="col">{{ report.payment.total }} - ({{ report.user.total }}+{{ report.equipent.total }})={{report.payment.total-(report.equipent.total+report.user.total)}}</th>
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

export default {
  name: "MonthlyReportView",
  data: function () {
    return {
      roletype: this.$store.getters.user["role"],
      report: false,
      btnclick: false,
      year: 2022,
      loading: false,
      month: '',
    };
  },
  methods: {
    getreport: async function () {
      this.loading = true;
      if (this.year && this.month) {
        var myurl = URL + "api/monthlyreport/" + this.year + "/" + this.month+ "/";
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
              this.report = data.data;
              // console.log(this.equipment['0'])
              this.btnclick = true;
              this.loading = false;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(error);
          });
      } else {
        alert("start date or end date or user are empty");
        this.loading = false;
      }
    },
  },
};
</script>
