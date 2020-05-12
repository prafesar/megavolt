<template>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-card-title>{{cable.title}}</v-card-title>
    <v-card-subtitle>Ф{{fider.number}} {{fider.team}} ПС-{{fider.station}} {{fider.section}}СШ</v-card-subtitle>
    <v-card-text>{{cable.description}}</v-card-text>

  </v-card>

</template>

<script>

import { CableService } from '~/components/services';

export default {
 
  data() {
    return {
      cable: {},
      fider: {},
    }
  },

  props: {
    id: {
      type: String,
    }
  },

 
  created() {
    CableService
      .getCablebyId(this.id)
      .then(cable => {
        this.cable = cable;
        this.fider = cable.fider;
      })
  },

}
</script>

<style>

</style>