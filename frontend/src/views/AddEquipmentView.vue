<template>
  <div class="text-white">
    <h1>Add Equipment</h1>
    <div v-if="!loading" class="container">
      <!-- input -->
      <div class="form-group">
        <label for="name">Equipments Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter equipment name"
          required
        />
        <small class="form-text text-muted"
          >Please write name that equipment.</small
        >
      </div>
      <!-- end input -->
      <!-- input -->
      <div class="form-group">
        <label for="name">Equipments Price</label>
        <input
          v-model="total"
          type="number"
          class="form-control"
          id="total"
          placeholder="Enter equipment price"
          required
        />
        <small class="form-text text-muted"
          >Please write price that equipment,equipment price must be a
          number.</small
        >
      </div>
      <!-- end input -->
      <button class="btn btn-primary mt-2" v-on:click="addequipment">
        Add Equipments
      </button>
      <div v-if="addmsg" class="text-success mt-3">
        <h2>successfully you add equipment.</h2>
      </div>
    </div>
    <div v-else class="container">
      <div class="row">
        <div class="spinner-border text-danger" role="status"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { URL } from "../store/const.js";
import moment from "moment";

export default {
  name: "AddEquipmentView",
  data: function () {
    return {
      roletype: this.$store.getters.user["role"],
      loading: false,
      name: "",
      total: "",
      addmsg: false,
    };
  },
  async beforeCreate() {},
  methods: {
    addequipment: async function () {
      this.loading = true;
      if (this.name && this.total) {
        var myurl = URL + "api/equipment/";
        var mydata = JSON.stringify({ name: this.name, total: this.total });
        await fetch(myurl, {
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
            if (data.detail) {
              alert(data.detail);
            }
            if (data.success) {
              this.loading = false;
              this.addmsg = true;
              this.name = "";
              this.total = "";
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(error);
          });
      } else {
        alert("name and total are not be null :D");
        this.loading = false;
      }
    },
  },
};
</script>
