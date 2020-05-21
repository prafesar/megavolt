<template>

  <v-card
    color="grey lighten-4"
    height="auto"
    max-width="600"
  >
    <v-toolbar dense>
      <v-toolbar-title>Кабельные линии</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- <v-text-field
      label="Поиск"
      v-model="search"
      clearable
      class="display-1 mx-12 mt-6"
      @keyup.enter="getFiltredCableList"
    >
    </v-text-field>
    <v-card-text>
      <p v-for="cable in cables" :key="cable.key">{{cable.title}}</p>
    </v-card-text> -->

  </v-card>
</template>

<script>

import _ from 'lodash';
import { CableService } from '~/components/services';

export default {
  // computed: {
  //   cables() {
  //     return this.$store.state.cables.getAllCables
  //   },
  // },
  
  // created() {
  //   return CableService
  //       .getAllCables()
  //       .then(cables => this.$store.commit('setCablesMutation', cables))
  // },

  // methods: {
  //   getFiltredCableList() {
  //     return CableService
  //       .getCablesByFiderNumber(this.searchByFider)
  //       .then(cables => this.cables = cables)
  //   },
  // }

}
</script>

<style scoped>

</style>