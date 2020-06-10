<template>

  <v-card
    color="grey lighten-4"
    height="auto"
    max-width="600"
  >
    <v-toolbar dense>
      <v-toolbar-title>Кабельные линии: Поиск</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-text-field
      label="Поиск"
      v-model="search"
      clearable
      class="display-1 mx-12 mt-6"
      @keyup.enter="onSearch"
    >
    </v-text-field>
    
    <v-card-text>
      <cable-card
        v-for="cable in searchResult"
        :key="cable.id"
        v-bind="cable"
      >
      </cable-card>

    </v-card-text>

  </v-card>
</template>

<script>

import DB from '~/firebase/db';
import CableCard from './CableCard';

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
      const searchWords = this.search.toUpperCase().split(' ').map(word => word.trim());
      console.log(searchWords);
      return DB.collectionGroup('cables')
        .where('tags', 'array-contains-any', searchWords)
        .get()
        .catch(() => {
          console.error('download snapShot error ' + error.message);
          throw new Error;
        })
        .then(snapQwery => this.searchResult = snapQwery.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        .catch(() => {
          console.error('download cable data by search error ' + error.message);
          throw new Error;
        })
        .then(() => this.loading = false)
    },
  },
}
</script>

<style scoped>

</style>