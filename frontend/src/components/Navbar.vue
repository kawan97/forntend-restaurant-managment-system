<template>
  <div>
    <div class="btn" v-on:click="toggle">
      <img src="@/assets/svg/right.svg" />
    </div>
    <nav v-bind:class="{ show: show }" class="sidebar">
      <div id="mytitle" class="text" v-on:click="toggle">rest</div>
      <ul class="main_side">
        <!-- admin navigation -->
        <div v-if="this.$store.getters.user['role'] == 'admin'">
          <li :class="{ active: this.$route.name == 'home' }">
            <router-link
              :to="{
                name: 'home',
              }"
              >Home</router-link
            >
          </li>

          <li :class="{ active: this.$route.name == 'addequipment' }">
            <router-link
              :to="{
                name: 'addequipment',
              }"
              >Add Equipment</router-link
            >
          </li>

          <li :class="{ active: this.$route.name == 'monthlyreport' }">
            <router-link
              :to="{
                name: 'monthlyreport',
              }"
              >Monthly Report</router-link
            >
          </li>

          <li :class="{ active: this.$route.name == 'equipmentreport' }">
            <router-link
              :to="{
                name: 'equipmentreport',
              }"
              >Equipment Report</router-link
            >
          </li>

          <li :class="{ active: this.$route.name == 'orderreport' }">
            <router-link
              :to="{
                name: 'orderreport',
              }"
              >Order Report</router-link
            >
          </li>

          <li :class="{ active: this.$route.name == 'userreport' }">
            <router-link
              :to="{
                name: 'userreport',
              }"
              >User Report</router-link
            >
          </li>

          <li>
            <p v-on:click="logout"><img src="@/assets/svg/left.svg" />Logout</p>
          </li>
        </div>
        <!-- admin navigation -->

        <!-- captain navigation -->
        <div v-if="this.$store.getters.user['role'] == 'captain'">
          <li :class="{ active: this.$route.name == 'home' }">
            <router-link
              :to="{
                name: 'home',
              }"
              >Home</router-link
            >
          </li>
          <li>
            <p v-on:click="logout"><img src="@/assets/svg/left.svg" />Logout</p>
          </li>
        </div>
        <!-- captain navigation -->

        <!-- chef navigation -->
        <div v-if="this.$store.getters.user['role'] == 'chef'">
          <li :class="{ active: this.$route.name == 'suborder' }">
            <router-link
              :to="{
                name: 'suborder',
              }"
              >Home</router-link
            >
          </li>
          <li>
            <p v-on:click="logout"><img src="@/assets/svg/left.svg" />Logout</p>
          </li>
        </div>
        <!-- chef navigation -->

        <!-- waiter navigation -->
        <div v-if="this.$store.getters.user['role'] == 'waiter'">
          <li :class="{ active: this.$route.name == 'waitersuborder' }">
            <router-link
              :to="{
                name: 'waitersuborder',
              }"
              >Home</router-link
            >
          </li>
          <li>
            <p v-on:click="logout"><img src="@/assets/svg/left.svg" />Logout</p>
          </li>
        </div>
        <!-- waiter navigation -->

        <li>
          <p v-on:click="toggle"><img src="@/assets/svg/left.svg" />Hide</p>
        </li>
      </ul>
    </nav>
    <div class="content">
      <div class="header">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
      show: false,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    toggle: function () {
      if (this.show) {
        this.show = false;
        // console.log(this.show);
      } else {
        this.show = true;
        // console.log(this.show);
      }
    },
    logout: function (event) {
      this.$store.dispatch({
        type: "logout",
      });
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
#mytitle {
  cursor: pointer;
}
body {
  background-color: #eee;
}

.btn {
  position: absolute;
  top: 10px;
  left: 45px;
  height: 37px;
  width: 37px;
  text-align: center;
  background: #1b1b1b;
  border-radius: 3px;
  cursor: pointer;
  transition: left 0.4s ease;
}

.btn.click {
  left: 260px;
}

.btn span {
  color: white;
  font-size: 15px;
  line-height: 36px;
}

.btn.click span:before {
  content: "\f00d";
}

.sidebar {
  position: fixed;
  width: 250px;
  height: 100%;
  left: -250px;
  background: #1b1b1b;
  transition: left 0.4s ease;
}

.sidebar.show {
  left: 0px;
}

.sidebar .text {
  color: white;
  font-size: 19px;
  font-weight: 600;
  line-height: 65px;
  text-align: center;
  background: #1e1e1e;
  letter-spacing: 1px;
}

nav ul {
  background: #1b1b1b;
  height: 100%;
  width: 100%;
  list-style: none;
  padding-left: 10px;
}

nav ul li {
  line-height: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

nav ul li:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
nav ul li p {
  position: relative;
  color: white;
  text-decoration: none;
  font-size: 13px;
  padding-left: 14px;
  font-weight: 500;
  display: block;
  width: 100%;
  border-left: 3px solid transparent;
}

nav ul li.active p {
  cursor: pointer;
  color: #fc5404;
  background: #1e1e1e;
  border-left-color: #fc5404;
}

nav ul li p:hover {
  cursor: pointer;
  background: #1e1e1e;
}

nav ul li a {
  position: relative;
  color: white;
  text-decoration: none;
  font-size: 13px;
  padding-left: 14px;
  font-weight: 500;
  display: block;
  width: 100%;
  border-left: 3px solid transparent;
}

nav ul li.active a {
  color: #fc5404;
  background: #1e1e1e;
  border-left-color: #fc5404;
}

nav ul li a:hover {
  background: #1e1e1e;
}

.feat-show {
  transition: all 0.5s;
}

nav ul li.active ul {
  transition: all 0.5s;
}

nav ul ul {
  position: static;
  display: none;
}

nav ul.show {
  display: block;
  transition: all 0.5s;
}

nav ul ul li {
  line-height: 42px;
  border-top: none;
}

nav ul ul li a {
  font-size: 12px;
  color: #e6e6e6;
}
nav ul ul li p {
  font-size: 12px;
  color: #e6e6e6;
}

nav ul li.active ul li a {
  color: #e6e6e6;
  background: #1b1b1b;
  border-left-color: transparent;
}
nav ul li.active ul li p {
  color: #e6e6e6;
  background: #1b1b1b;
  border-left-color: transparent;
}
a:hover {
  color: #fc5404 !important;
}
p:hover {
  color: #fc5404 !important;
}
nav ul ul li a:hover {
  color: #fc5404 !important;
  background: #1e1e1e !important;
}
nav ul ul li p:hover {
  color: #fc5404 !important;
  background: #1e1e1e !important;
}
nav ul li a span {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 15px;
  transition: transform 0.4s;
}

nav ul li a span.rotate {
  transform: translateY(-50%) rotate(-180deg);
}
nav ul li p span {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 15px;
  transition: transform 0.4s;
}

nav ul li p span.rotate {
  transform: translateY(-50%) rotate(-180deg);
}

.content {
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #202020;
  z-index: -1;
  text-align: center;
}
</style>
