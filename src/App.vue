<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";

import NavBar from './components/NavBar.vue'

export default {
  components: { NavBar },
  beforeCreate: function() {
    document.querySelector('body').setAttribute('style', 'background:#e6e6e6')

    auth.getRedirectResult().then(result=>{
      if (result.user) {
        this.$router.push("/upload")
      }
    }).catch(() => {
      this.$router.push("/")
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c5042;
}

#navbar{
  padding: 0em;
}
</style>
