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
      v-model="searchByFider"
      v-on:input="getCableList"
    >
    </v-text-field>
    <p>{{searchByFider}}</p>

    <v-list
      v-if="cables.length">
      <v-list-item
        v-for="cable in cables"
        :key="cable.id"
      >
        <v-list-item-title>{{cable.title}}</v-list-item-title>
        <v-list-item-subtitle>Ф{{cable.fider.number}}</v-list-item-subtitle>
        <v-list-item-action
          @click="openCableCard(cable.id)"
        >
        Карточка
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <p v-else>Нет результатов</p>

  </v-card>
</template>

<script>

import { CableService } from '~/components/services';

export default {

  data() {
    return {
      searchByFider: null,
      cables: [],
    }
  },

  methods: {
    getCableList() {
      CableService
        .getCablesByFiderNumber(this.searchByFider)
        .then(cables => this.cables = cables)
    },
    openCableCard(id) {
      this.$router.push(`/cables/${id}`)
    },
  },

  watch: {

  }

}
</script>

<style scoped>

</style>
