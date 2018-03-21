<template>
<section class="page">
  <div class="columns">
    <div class="column is-one-fifth">
        <projects-side-bar />
    </div>
    <div class="column">
      <router-view></router-view>
    </div>
  </div>
</section>
</template>

<script>
import SideBar from '@/components/SideBar'
import ProjectsSideBar from '@/components/projects/ProjectsSideBar'

export default {
  data () {
    return {
      projects: []
    }
  },
  mounted () {
  },
  components: {
    SideBar,
    ProjectsSideBar
  }
}
</script>

<style>
</style>
