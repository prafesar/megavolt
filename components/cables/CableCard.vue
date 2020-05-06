<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>
      {{`Ф${cable.fider.number} → ${cable.fider.station} → ${cable.fider.location}`}}
    </v-card-subtitle>
    <v-card-text>
      {{cable.description}}
    </v-card-text>
  </v-card>
</template>

<script>
import { CableService } from '../services';

export default {
  props: ['id'],
  
  data() {
    return {
      cable: {}
    }
  },

  created() {
    CableService
      .getCableById(id)
      .then(result => this.cable = result)
  },

}
</script>

<style>

</style>