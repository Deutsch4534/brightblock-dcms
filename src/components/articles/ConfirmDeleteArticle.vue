<template>
<div class="columns">
  <div class="column content is-8">
      <h1><a :href="'#/projects/' + project.projectId">{{ project.name }}</a></h1>
      <p class="is-size-6">All data associated with this project will be lost forever!</p>
      <p class="is-size-7">Last edited: {{ niceUpdateTime(project.updated) }}</p>
      <p>{{ project.description }}</p>
      <button class="button is-danger" v-on:click="deleteProject">Confirm Delete</button>
    </div>
</div>
</template>

<script>
import articlesService from '../../services/articlesService'
import moment from 'moment'

export default {
  name: 'ConfirmDeleteArticle',
  data () {
    return {
      articleId: (this.$route && this.$route.params.articleId) ? parseInt(this.$route.params.articleId) : undefined,
      article: {
        updated: undefined,
        articleId: undefined,
        name: '',
        description: ''
      },
    }
  },
  components: {
  },
  mounted () {
    if (this.articleId) {
      this.article = articlesService.getProject(this.articleId)
      console.log('ConfirmDeleteArticle: ', this.article)
    }
  },
  methods: {
    niceUpdateTime: function (updated) {
      let upd = moment(updated).format('LLLL')
      return upd
    },
    deleteArticle: function (event) {
      articlesService.delete(this.articleId).then((articles) => {
        this.$router.push('/articles/list')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../../node_modules/bulma/bulma.sass";
</style>
