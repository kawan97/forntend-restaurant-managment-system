<template>
<div>
<div class="btn" v-on:click="toggle"><img  src="@/assets/svg/right.svg"></div>
<nav v-bind:class="{ show: show }"  class="sidebar ">
    <div class="text"> rest </div>
    <ul class="main_side">
        <li class="active"><a href="#">Dashboard</a></li>

        <li><a href="#">Users</a></li>
        <li><a href="#">Message</a></li>
        <li><a href="#">Bookmark</a></li>
        <!-- <li class="active"> <a href="#"  id="2">Services <span class="fas fa-caret-down"></span> </a>
            <ul class="item-show-2 show">
                <li><a href="#">App Design</a></li>
                <li><a href="#">Web Design</a></li>
            </ul>
        </li> -->
        <li><a href="#" v-on:click="toggle"><img src="@/assets/svg/left.svg">Hide</a></li>
        <li><a href="#" v-on:click="logout"><img src="@/assets/svg/left.svg">Logout</a></li>

    </ul>
</nav>
<div class="content">
    <div class="header"> Main dsdsd goes here </div>
</div>
</div>
</template>

<script>

export default {
  name: "Navbar",
    data: function () {
    return {
      show: false
    }
  },
  props: {
    msg: String,
  },
  methods: {
    toggle:function(){
      if(this.show){
        this.show=false
        console.log(this.show)

      }else{
        this.show=true
        console.log(this.show)

      }
    },
    logout: function (event) {
      this.$store.dispatch({
        type: "logout",
      });
      this.$router.push({
    name: 'login', 
    
});
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
    margin: 0;
    padding: 0;
    user-select: none;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif
}

body {
    background-color: #eee
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
    transition: left 0.4s ease
}

.btn.click {
    left: 260px
}

.btn span {
    color: white;
    font-size: 15px;
    line-height: 36px
}

.btn.click span:before {
    content: '\f00d'
}

.sidebar {
    position: fixed;
    width: 250px;
    height: 100%;
    left: -250px;
    background: #1b1b1b;
    transition: left 0.4s ease
}

.sidebar.show {
    left: 0px
}

.sidebar .text {
    color: white;
    font-size: 19px;
    font-weight: 600;
    line-height: 65px;
    text-align: center;
    background: #1e1e1e;
    letter-spacing: 1px
}

nav ul {
    background: #1b1b1b;
    height: 100%;
    width: 100%;
    list-style: none;
    padding-left: 10px
}

nav ul li {
    line-height: 50px;
    border-top: 1px solid rgba(255, 255, 255, 0.1)
}

nav ul li:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05)
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
    border-left: 3px solid transparent
}

nav ul li.active a {
    color: #FC5404;
    background: #1e1e1e;
    border-left-color: #FC5404
}

nav ul li a:hover {
    background: #1e1e1e
}

.feat-show {
    transition: all 0.5s
}

nav ul li.active ul {
    transition: all 0.5s
}

nav ul ul {
    position: static;
    display: none
}

nav ul.show {
    display: block;
    transition: all 0.5s
}

nav ul ul li {
    line-height: 42px;
    border-top: none
}

nav ul ul li a {
    font-size: 12px;
    color: #e6e6e6
}

nav ul li.active ul li a {
    color: #e6e6e6;
    background: #1b1b1b;
    border-left-color: transparent
}

a:hover {
    color: #FC5404 !important
}

nav ul ul li a:hover {
    color: #FC5404 !important;
    background: #1e1e1e !important
}

nav ul li a span {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 15px;
    transition: transform 0.4s
}

nav ul li a span.rotate {
    transform: translateY(-50%) rotate(-180deg)
}

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #202020;
    z-index: -1;
    text-align: center
}
</style>
