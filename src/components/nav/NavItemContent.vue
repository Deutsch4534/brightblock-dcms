<template>
<div class="navbar-item has-dropdown" v-bind:class="{ 'is-active': isActive }" @click="isActive = ! isActive">
  <div class="navbar-link">
    Content
  </div>
  <div class="navbar-dropdown">
    <router-link
      class="navbar-item"
      to="/content">
        Create
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'NavItemContent',
  data: () => {
    return {
      isActive: false
    }
  }
}
</script>

<style>
</style>
