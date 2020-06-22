<template>
  <div id="app">
    <!-- $route.fullPath : Reacting to Params Changes -->

    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: rgba($color: #e5e5e5, $alpha: 0.6);
}
</style>
