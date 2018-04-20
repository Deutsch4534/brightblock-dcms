<template>
<section class="page">
  <div class="columns">
    <div class="column is-one-fifth">
        <articles-side-bar />
    </div>
    <div class="column">
      <router-view></router-view>
    </div>
  </div>
</section>
</template>

<script>
import ArticlesSideBar from '@/components/articles/ArticlesSideBar'
import SideBar from '@/components/SideBar'

export default {
  name: 'Articles',
  data: () => {
    return {
      articles: []
    }
  },
  components: {
    SideBar,
    ArticlesSideBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #create-button{
    width: 100%;
  }
  .list-group-item{
    height: 7em;
  }
  .notes-list-container {
    height: 100%;
    position: relative;
    border-right: 1px solid rgba(0,0,0,.125);
    /*
      CSS vodoo magic, requires min-width to set on flex-child elem when using a nested 'no-wrap'
      ie. https://css-tricks.com/flexbox-truncated-text/
    */
    min-width: 0;
  }
  .footer {
    margin: 1.5em 1em;
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 50%;
  }
  .note-preview {
    margin-bottom: 0.5em;
  }
</style>
