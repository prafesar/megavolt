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

    <v-text-field
      label="Поиск по фидеру"
      v-model.number="searchByFider"
      clearable
      class="display-1 mx-12 mt-6"
      @keyup.enter="getCableList"
    >
    </v-text-field>

      <v-expansion-panels accordion focusable>
        <v-expansion-panel
          v-for="cable in cables"
          :key="cable.id"
        >
          <v-expansion-panel-header>{{cable.title}}</v-expansion-panel-header>
          <v-expansion-panel-content >
            <cable-card v-bind="cable"></cable-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

  </v-card>
</template>

<script>

import { CableService } from '~/components/services';
import { CableCard } from './CableCard';

export default {

  data() {
    return {
      searchByFider: null,
      cables: [],
    }
  },

  components: {
    CableCard
  },

  methods: {
    getCableList() {
      return CableService
        .getCablesByFiderNumber(this.searchByFider)
        .then(cables => this.cables = cables)
    },

    openCableCard(id) {
      this.$router.push(`/cables/${id}`)
    },
  },

}
</script>

<style scoped>

</style>
