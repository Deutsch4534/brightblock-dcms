<template>
<aside class="menu">
  <h3 class="menu-label">
    Manage Content
  </h3>
  <ul class="menu-list">
    <li>
    <router-link
      to="/projects/create">
      Projects
    </router-link>
    </li>
    <li>
    <router-link
      to="/content/create">
      Content
    </router-link>
    </li>
  </ul>
</aside>
</template>

<script>

export default {
  data: () => ({
  }),
  components: {
  }
}
</script>

<style lang="scss">
    @import "../../node_modules/bulma/bulma.sass";
</style>
