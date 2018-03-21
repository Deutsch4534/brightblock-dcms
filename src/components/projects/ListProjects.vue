<template>
<section>
  <div class="columns">
    <div class="column content is-12">
      <h1 class="title">Your Projects</h1>
    </div>
  </div>
  <div class="columns project"
      v-for="project in projects"
      :key="project.projectId">
      <div class="column content is-8">
        <h1><a :href="'#/projects/' + project.projectId">{{ project.name }}</a></h1>
        <p class="is-size-7">Last edited: {{ niceUpdateTime(project.updated) }}</p>
        <p>{{ project.description }}</p>
      </div>
      <div class="column is-4">
        <a :href="'#/projects/confirmDelete/' + project.projectId"><i class="far fa-trash-alt"></i></a>
      </div>
    </div>
</section>
</template>

<script>
import projectsService from '../../services/projectsService'
import moment from 'moment'

export default {
  name: 'ListProjects',
  data () {
    return {
      projects: []
    }
  },
  components: {
  },
  mounted () {
    projectsService.fetch().then((projects) => {
      this.projects = projects
    })
  },
  computed: {
    // a computed getter
  },
  methods: {
    niceUpdateTime: function (updated) {
      let upd = moment(updated).format('LLLL')
      return upd
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../../node_modules/bulma/bulma.sass";
</style>
<style lang="css">
.project {
  margin-bottom: 0px;
}
</style>
