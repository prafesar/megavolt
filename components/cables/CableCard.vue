<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>

    <v-card-text>
      <nuxt-link v-bind:to="'/cables/' + key"> more...</nuxt-link>
    </v-card-text>
  </v-card>
</template>

<script>
import { CableService } from '../services';

export default {
  props: {
    key: Number,
  },
  
  data() {
    return {
      cable: {}
    }
  },

  created() {
    CableService
      .getCableById(params.id || this.key || 3)
      .then(() => console.log('read data for card'))
      .then(result => this.cable = result)
  },



}
</script>

<style>

</style>