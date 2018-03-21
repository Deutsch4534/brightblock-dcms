<template>
<div>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">Content Block</h1>
        <h2 class="subtitle is-3">Decentralised Content Management Platform</h2>
        <h3 class="subtitle is-1">
          <router-link
            class="button"
            to="/projects/list">
              Get Started
          </router-link>
        </h3>
      </div>
    </div>
  </section>
  <cards/>
</div>
</template>

<script>
import Cards from '@/components/home/Cards'

export default {
  data: () => ({
  }),
  components: {
    Cards
  }
}
</script>

<style>
</style>
