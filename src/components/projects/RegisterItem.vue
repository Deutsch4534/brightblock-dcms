<template>
  <div class="columns">
    <div class="column content is-8">
      <h1 class="title">Register Your Record of Ownership</h1>
      <p>A record of ownership needs to saved onto the bitcoin blockchain to be registered.</p>
      <p>By proceeding you are declaring that this item is not only in your possession but that it also belongs to you.</p>
      <h1><a :href="'#/projects/' + project.projectId">{{ project.name }}</a></h1>
      <p class="is-size-7">Last edited: {{ niceUpdateTime(project.updated) }}</p>
      <p>{{ project.description }}</p>
    </div>
  </div>
</template>

<script>
import projectsService from '../../services/projectsService'
import moment from 'moment'

export default {
  name: 'RegisterItem',
  data () {
    return {
      projectId: (this.$route && this.$route.params.projectId) ? parseInt(this.$route.params.projectId) : undefined,
      project: {
        updated: undefined,
        projectId: undefined,
        name: '',
        description: ''
      },
      shapeShiftData: {}
    }
  },
  components: {
  },
  mounted () {
    if (this.projectId) {
      this.project = projectsService.getProject(this.projectId)
      console.debug('CreateProject: ', this.project)
    }
    projectsService.fetch().then((projects) => {
      this.projects = projects
    })
    // let options = { username: window.blockstack.loadUserData().username }
    window.blockstack.getFile('projects.json')
      .then((file) => {
        console.info('file: ' + file)
        // this.project = JSON.parse(file || '[]')
        this.enc = window.blockstack.encryptContent(file)
        this.denc = projectsService.getDecrypted(this.enc)
      }).catch(e => {
        console.error('getFile: e : ', e)
      })
    projectsService.getSSRates(this.project).then((data) => {
      this.shapeShiftData = data
    })
    // projectsService.getEncrypted({content: 'some conenet'})
  },
  methods: {
    niceUpdateTime: function (updated) {
      let upd = moment(updated).format('LLLL')
      return upd
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../../node_modules/bulma/bulma.sass";
</style>
