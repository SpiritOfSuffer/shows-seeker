<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ShowComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ShowComponent from './components/ShowComponent.vue'

export default {
  name: 'app',
  components: {
    ShowComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
