<template>
  <div id="allTheNav">
    <nav id="navigator" class="navbar" :class="{navbaropen: largeSideBar.getSideBarToggleProperties}">
      <span class="open-slide">
        <a href="#" @click="largeSideBar.toggleSidebarProperties">
          <div>
            <div class="bar" :class="{topopen: largeSideBar.getSideBarToggleProperties}"></div>
            <div class="bar" :class="{midopen: largeSideBar.getSideBarToggleProperties}"></div>
            <div class="bar" :class="{botopen: largeSideBar.getSideBarToggleProperties}"></div>
          </div>
        </a>
      </span>
      <ul class="navbar-nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

import { useLargeSideBar } from '../stores/largeSideBar'

const largeSideBar = useLargeSideBar()

</script>

<style>
body{
  font-family: "Arial", Serif;
  background-color: #f5f5f5;
  overflow-x: hidden;
}

.navbar{
  background-color: #3b5998;
  overflow: hidden;
  height: 63px;
}

.navbaropen{
  background-color: #3b5998;
  overflow: hidden;
  height: 63px;
  margin-left: 250px;
}

.navbar a{
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar ul{
  margin: 8px 0 0 0;
  list-style: none;
}

.navbar a:hover{
  background-color: #ddd;
  color: #000;
}

#main{
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
}

.mainopen{
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  margin-left: 250px;
}

nav{
  transition: margin-left 0.3s;
}

.bar{
  display: block;
  height: 5px;
  width: 35px;
  background: #000;
  margin: 5px auto;
}

.midopen{
  width: 0;
}
.bar{
  transition: all .3s ease;
}
.topopen{
  transform: translateY(10px) rotateZ(45deg);
}
.botopen{
  transform: translateY(-10px) rotateZ(-45deg);
}
</style>