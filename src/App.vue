<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(0)
  }
}
</script>

<style>
@import './assets/css/reset.css';
html,body,#app{
  height: 100%;
}
</style>
