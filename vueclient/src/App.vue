<template>
  <div id="app">
<!--    <application_per></application_per>-->
    <top></top>
<!--    <join></join>-->
  </div>
</template>

<script>
  import application_per from './components/application_per'
  import top from './components/top'
  import join from './components/join'
  export default {
  name: 'App',
  components:{
    application_per,
    top,
    join
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
