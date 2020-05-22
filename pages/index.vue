<template>
<div>
  <h1>Main</h1>
  <ul v-if="list">
    <li v-for="item in cables" :key="item.id">
      {{item.title}}
    </li>
  </ul>
</div>


</template>

<script>

export default {

  async fetch({ store, error }) {
    try {
      await store.dispatch('cables/fetchCableList')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch cables list at this time'
      })
    }
  },

  computed: {
    list() {
      return this.cables = this.$store.getters['cables/getCableList'];
    }
  }

};
</script>

<style>

</style>



