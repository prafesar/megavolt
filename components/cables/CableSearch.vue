<template>

  <v-card
    color="grey lighten-4"
    height="auto"
    max-width="600"
  >
    <!-- <v-toolbar dense>
      <v-spacer></v-spacer>
    </v-toolbar> -->
   
    <v-card-text>
      <v-text-field
        label="Поиск по номеру в названии"
        v-model="search"
        clearable
        class="display-1 mx-12 mt-6"
        @keyup.enter="onSearch"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text v-if="!search">Поиск по кабельным линиям ведется по номеру ТП, СР, РП. Для поиска кабельных линий по фидеру, надо перед номером добавить букву Ф. К примеру 'Ф102'</v-card-text>
    <v-card-text v-if="loading">Идет загрузка данных ... </v-card-text>

    <cable-card
      v-for="cable in searchResult"
      :key="cable.id"
      v-bind="cable"
    >
    </cable-card>

  </v-card>
</template>

<script>

import axios from 'axios';
import DB from '~/firebase/db';
import CableCard from './CableCard';
const baseUrl = 'https://us-central1-prafesar-labs.cloudfunctions.net';

export default {
  data() {
    return {
      search: '',
      searchResult: [],
      loading: false,
    }
  },

  components: { CableCard },

  methods: {
    onSearch() {
      if (this.search === '') {
        this.searchResult = [];
        return;
      }
      
      this.loading = true;
      
      axios
        .get(`${baseUrl}/getCableListBySearch?search=${this.search}`) // ${this.search}
        .catch(() => console.log('error read data'))
        .then(result => this.searchResult = result.data)
        .then(() => this.loading = false)
      
    },
  },
}
</script>

<style scoped>

</style>