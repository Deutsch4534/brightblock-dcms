<template>
<section>
  <div class="columns">
    <div class="column content is-12">
      <h1 class="title">Your Articles</h1>
    </div>
  </div>
  <div class="columns article"
      v-for="article in articles"
      :key="article.articleId">
      <div class="column content is-8">
        <h1><a :href="'#/articles/' + article.articleId">{{ article.name }}</a></h1>
        <p class="is-size-7">Last edited: {{ niceUpdateTime(article.updated) }}</p>
        <p>{{ article.description }}</p>
      </div>
      <div class="column is-4">
        <a :href="'#/articles/confirmDelete/' + article.articleId"><i class="far fa-trash-alt"></i></a>
      </div>
    </div>
</section>
</template>

<script>
import articlesService from '../../services/articlesService'
import moment from 'moment'

export default {
  name: 'ListArticles',
  data () {
    return {
      articles: []
    }
  },
  components: {
  },
  mounted () {
    articlesService.fetch().then((articles) => {
      this.articles = articles
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
.article {
  margin-bottom: 0px;
}
</style>
