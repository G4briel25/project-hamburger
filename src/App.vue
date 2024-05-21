<script setup>
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue'
import NavBar from './components/NavBar.vue'

const props = {
  logo_src: '/img/logo.png',
  app_name: 'Make your burguer'
};


</script>

<template>
  <NavBar :logo="props.logo_src" :alt="props.app_name"/>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<style>
  * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container {
    margin: 50px;
    height: 650px;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
</style>
