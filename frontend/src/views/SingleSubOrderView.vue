<template>
  <div class="text-white">
    <h1>Sub Order id :{{ this.$route.params.suborderid }}</h1>
    <div class="container">
      <div v-if="loading" class="row">
        <div>
          <div class="spinner-border text-danger" role="status"></div>
        </div>
      </div>

      <li v-if="suborder">
        Sub order :{{ suborder[0].id }} ,and Status : {{ suborder[0].status }}
        <div
          v-for="(item, index) in suborder[0]['orderitemsuborder']"
          :key="item.id"
        >
          {{ index + 1 }} : {{ item.SubItem["name"] }} :
          {{ item.SubItem["item_price"] }}
        </div>
      </li>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Card from '@/components/Card.vue'
import { URL } from "../store/const.js";

export default {
  name: "SingleSubOrderView",
  data: function () {
    return {
      loading: true,
      suborder: null,
    };
  },
  async beforeCreate() {
        if (this.$store.getters.user["role"] != "admin" && this.$store.getters.user["role"] != "captain") {
      this.$store.dispatch({ type: "logout" });
    }
    if(!parseInt(this.$route.params.suborderid)){
      return null;
    }
    await fetch(URL + "api/suborders/" + this.$route.params.suborderid+"/", {
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
          // console.log("Success:", data.length);
          if (data.success) {
            this.suborder =null;
            this.suborder =data.data;

            this.loading = false;
          }

        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // now fetch all foods

    //end before create
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
