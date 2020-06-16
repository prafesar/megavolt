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

    <v-card
      v-for="cable in searchResult"
      :key="cable.id"
      class="my-4">
    
      <v-card-title>{{cable.title}}</v-card-title>
      <v-card-subtitle>{{cable.fider}}</v-card-subtitle>
      
      <v-card-text>Год: {{cable.year ? cable.year : 'неизвестно'}} <br>
      Возраст: {{cable.year ? 2020 - cable.year : 'неизвестно'}} <br>
      Длинна: {{cable.length ? cable.length : 'неизвестно'}} км <br>
      </v-card-text>
      
    </v-card>

  </v-card>
</template>

<script>

import axios from 'axios';
import DB from '~/firebase/db';

const baseUrl = 'https://us-central1-prafesar-labs.cloudfunctions.net';

export default {
  data() {
    return {
      search: '',
      searchResult: [],
      loading: false,
    }
  },
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