<template>
  <v-btn
    @click.prevent="exportCablesToJSON"
  >
    Export Cables
  </v-btn>
</template>

<script>

import { CableService } from '~/services';

export default {
  methods: {
    exportCablesToJSON() {
      return CableService
        .getAllCables()
        .then(cables => cables
          .map(({ id, title, fider: { number, team, station, section }}) => (
            `{ "id": ${id}, "title": "${title} (${team} Ф${number} ${station} ${section}СШ)" },\n`
          ))
        )
        .then(res => console.log(res.join('')))
        
    }
  }
}
</script>

<style>

</style>