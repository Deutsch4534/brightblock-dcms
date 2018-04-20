<template>
  <div class="columns">
    <div class="column content is-8">
      <h1 class="title">New Article</h1>
      <p>Provide a name and short description of your new project!</p>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            v-model="project.name"
            class="input"
            type="text"
            placeholder="name of your project..">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            v-model="project.description"
            class="textarea"
            placeholder="Short description of your project..">
          </textarea>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" v-on:click="create">Submit</button>
        </div>
        <div class="control">
            <router-link
              class="button"
              id="cancel-create-project"
              to="/projects"
              tag="button">
              Cancel
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articlesService from '../../services/articlesService'
// import { VueEditor } from 'vue2-editor'

export default {
  name: 'CreateArticle',
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
    if (this.projectId) {
      this.project = articlesService.getProject(this.projectId)
      console.log('CreateProject: ', this.project)
    }
  },
  methods: {
    create: function (event) {
      articlesService.saveOrUpdate(this.project).then(() => {
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
