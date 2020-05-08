<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >
          <v-toolbar-title>This is a header</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:default>
        <v-row>
          <v-col
            
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <cable-card 
              v-for="item in items"
              :key="item.id"
            >
            </cable-card>

          </v-col>
        </v-row>
      </template>


    </v-data-iterator>
  </v-container>
</template>

<script>
import CableCard from './CableCard';
import { CableService } from '../services';

export default {
  components: {
    CableCard,
  },
  
  data() {
    return {
      itemsPerPage: 4,
      items: [],
    }
  },
  
  created() {
    CableService
      .getAllCables()
      .then(result => this.items = result.slice(3, 7))
      .then(() => console.log('read the data'))
  },

}
</script>

<style scoped>

</style>
