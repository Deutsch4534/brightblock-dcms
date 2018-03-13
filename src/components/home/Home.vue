<template>
<div class="columns">
  <div class="column is-one-fifth">
    <content-side-bar />
  </div>
  <div class="column">
    <cards/>
  </div>
</div>
</template>

<script>
import Cards from '@/components/home/Cards'
import ContentSideBar from '@/components/home/ContentSideBar'

export default {
  data: () => ({
  }),
  components: {
    Cards,
    ContentSideBar
  }
}
</script>

<style>
.columns {
  margin-top: 20px;
}
.column {
  padding: 20px;
}
</style>
