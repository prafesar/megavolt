<template>
<div>
  <h1>Кабельные линии</h1>

  <v-text-field
    v-model="search"
    @keyup.enter="onSearch"
  ></v-text-field>
  
  <p v-if="!list.length"> сервер с данными недоступен </p>

  <ul v-if="filtredList">
    <li v-for="item in filtredList" :key="item.id">
      {{item.title}}
    </li>
  </ul>
</div>


</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      search: '',
      filtredList: [],
    }
  },

/*
* TODO: fix nuxt generate error, cause 'fetch'
*/
  // fetch({ store, error }) {
  //   return store.dispatch('cables/fetchCableList')
  //     .catch(() => console.log('dispatch error'))
  // },

  methods: {
    onSearch() {
      if (this.search === '') {
        this.filtredList = [];
        return;
      }

      if (this.search === 'все') {
        this.filtredList = this.list;
        return;
      }
      
      const searchWords = _.words(this.search.toUpperCase());
      
      return this.filtredList = this.list
        .filter(({ title }) => {
          return searchWords.every(word => title.toUpperCase().indexOf(word) != -1);
        })
    },
  },

  computed: {
    list() {
      return (
        this.$store.getters['cables/getCableList']);
    }
  }

};
</script>

<style>

</style>



