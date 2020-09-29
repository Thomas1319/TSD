<template>
  <div id="app">
    <div id="main">
      <NavBar/>
      <router-view/>
   </div>
    <Footer class="footer"/>
  </div>
</template>

<script>

import NavBar from './components/navBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {  
  NavBar,
  Footer
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  flex: 1 0 auto;
}

.footer{
   flex-shrink: 0;
}


</style>
