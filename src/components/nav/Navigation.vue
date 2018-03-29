<template>
<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
      <router-link class="fa-rotate-270" to="/" style="font-size:2.6em; color:Tomato">
        <i class="fas fa-bicycle"></i>
      </router-link>
      <router-link class="fa-rotate-270" to="/" style="margin-left: -25px; margin-bottom: 0px; font-size:2.6em; color:Tomato">
        <i class="fas fa-bicycle"></i>
      </router-link>
      <router-link to="/" style="font-size:1.6em; color:Tomato">
        Content Block
      </router-link>
    </div>
    <div class="navbar-burger" data-target="navMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div id="navMenu" class="navbar-menu">
  <!--
    <div class="navbar-start">
      <router-link
        class="navbar-item"
        to="/content">
          Admin
      </router-link>
    </div>
    -->
    <div class="navbar-end">
      <bright-block-auth showAccountLink="true"/>
    </div>
  </div>
</nav>
</template>

<script>
import BrightBlockAuth from 'bright-block-auth/src/components/auth/BrightBlockAuth'
import bulma from '@/services/bulma'

export default {
  name: 'Navigation',
  data: () => {
    return {
      debug: false
    }
  },
  mounted () {
    bulma.initDropdowns()
    if (this.$route.query && this.$route.query.debug) {
      this.debug = true
    }
  },
  components: {
    BrightBlockAuth
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar {
  width: 40px;
  height: 60px;
  margin-right: 10px;
}
</style>
