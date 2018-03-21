<template>
<aside class="menu">
  <p class="menu-label">
    Projects
  </p>
  <ul class="menu-list">
    <li v-bind:class="{ 'is-active': link1Active }">
      <router-link
        to="/projects/create">
        New Project
      </router-link>
      <li v-bind:class="{ 'is-active': link2Active }">
        <router-link
          to="/projects/list">
          All Projects
        </router-link>
        <ul>
          <li
             v-for="project in projects"
             :key="project.projectId">
                <a>{{ project.name }}</a>
          </li>
        </ul>
    </li>
  </ul>
</aside>
</template>

<script>

export default {
  props: ['projects'],
  data () {
    return {
      link1Active: false,
      link2Active: false,
    }
  },
  mounted () {
    let path = this.$route.fullPath
    if (path.indexOf('/projects/list')) {
      this.link1Active = true
    } else if (path.indexOf('/projects/create')) {
      this.link2Active = true
    }
  },
}
</script>

<style lang="scss">
</style>
