<template>
  <div id="app">
    <router-view/>
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
  @media(min-width: 776px) {
    margin: 0;
  }
  background-color: rgba($color: #e5e5e5, $alpha: 0.6);
}
</style>
