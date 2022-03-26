<template>
  <div class="text-white">
    <h1>Write feedback To Order</h1>
    <div class="container">
      <div class="form-group">
        <label for="text">Write Feedback</label>
        <textarea
          v-model="text"
          type="text"
          class="form-control"
          id="text"
          placeholder="Enter your Feedback"
        ></textarea>
        <small id="emailHelp" class="form-text text-muted"
          >Please Write Your FeedBack.</small
        >
      </div>

      <button class="btn btn-primary mt-2" v-on:click="getreport">
        Send Feedback
      </button>

      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>
      <!-- start -->
      <div v-if="!loading">
        <div v-if="btnclick" class="mt-4 row">
          <div v-if="feedback == 'answered'">
            sorry you already add feedback to this order
          </div>
          <div class="text-success" v-if="feedback == 'success'">
            you successfully add feedback
          </div>
                    <div class="text-danger" v-if="feedback == 'youhaveerr'">
            order id or key is wrong
          </div>
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
  name: "AddFeedback",
  data: function () {
    return {
      btnclick: false,
      loading: false,
      text: "",
      feedback: "",
    };
  },
  methods: {
    getreport: async function () {
      this.loading = true;
      if (this.$route.params.orderid && this.$route.params.key && this.text) {
        var mydata = JSON.stringify({ text: this.text });

        var myurl =
          URL +
          "api/feedback/" +
          this.$route.params.orderid +
          "/" +
          this.$route.params.key +
          "/";
        await fetch(myurl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
              this.btnclick = true;
              this.loading = false;
              this.feedback = "youhaveerr";

              alert(data.detail);
            }
            if (data.answered) {
              this.btnclick = true;
              this.loading = false;
              this.feedback = "answered";
            }
            if (data.success) {
              this.btnclick = true;
              this.loading = false;
              this.feedback = "success";
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(error);
          });
      } else {
        alert("feedback not be empty");
        this.loading = false;
      }
    },
  },
};
</script>
