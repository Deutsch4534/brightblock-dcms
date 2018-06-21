<template>
<div class="columns">
  <div class="column content is-8">
      <h1><a :href="'#/projects/' + project.projectId">{{ project.name }}</a></h1>
      <p class="is-size-6">All data associated with this project will be destroyed forever!</p>
      <p class="is-size-7">Last edited: {{ niceUpdateTime(project.updated) }}</p>
      <p>{{ project.description }}</p>
      <button class="button is-danger" v-on:click="deleteProject">Confirm Delete</button>
    </div>
</div>
</template>

<script>
import projectsService from '../../services/projectsService'
import moment from 'moment'

export default {
  name: 'ConfirmDelete',
  data () {
    return {
      projectId: (this.$route && this.$route.params.projectId) ? parseInt(this.$route.params.projectId) : undefined,
      project: {
        updated: undefined,
        projectId: undefined,
        name: '',
        description: ''
      },
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    niceUpdateTime: function (updated) {
      let upd = moment(updated).format('LLLL')
      return upd
    },
    deleteProject: function (event) {
      projectsService.delete(this.projectId).then((projects) => {
        this.$router.push('/projects/list')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../../node_modules/bulma/bulma.sass";
</style>
