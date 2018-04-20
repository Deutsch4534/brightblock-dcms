<template>
<aside class="menu">
  <p class="menu-label">
    Articles
  </p>
  <ul class="menu-list">
    <li v-bind:class="{ 'is-active': link1Active }">
      <router-link
        to="/articles/create">
        New Article
      </router-link>
      <li v-bind:class="{ 'is-active': link2Active }">
        <router-link
          to="/articles/list">
          All Articles
        </router-link>
        <ul>
          <li
             v-for="article in articles"
             :key="article.articleId">
                <a>{{ article.title }}</a>
          </li>
        </ul>
    </li>
  </ul>
</aside>
</template>

<script>

export default {
  name: 'ArticlesSideBar',
  props: ['articles'],
  data () {
    return {
      link1Active: false,
      link2Active: false,
    }
  },
  mounted () {
    let path = this.$route.fullPath
    if (path.indexOf('/articles/list')) {
      this.link1Active = true
    } else if (path.indexOf('/articles/create')) {
      this.link2Active = true
    }
  },
}
</script>

<style lang="scss">
</style>
