<template>

  <v-card>
    <v-card-title>
      Кабельные линии
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        name="search"
        id="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="cables"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.actions="">
        <!-- <v-icon small class="mr-2">
          mdi-view-compact-outline
        </v-icon>
        <v-icon small class="mr-2">
          mdi-format-list-bulleted
        </v-icon>
        <v-icon small class="mr-2">
          mdi-pencil-outline
        </v-icon> -->
      </template>
    </v-data-table>
    
  </v-card>

</template>

<script>

import { CableService } from '../services';

export default {
  data() {
    return {
      search: '',
        headers: [
          {
            text: 'Наименование',
            align: 'left',
            sortable: false,
            value: 'title',
          },
          { text: 'Фидер', value: `fider`, align: 'left' },
          { text: 'Действия', value: 'actions', align: 'left', sortable: false },

        ],
        cables: []
    }
  },
  
  created() {
    CableService
      .getAllCables()
      .then(result => this.cables = result
        .map(({ fider: { number, station, location }, title }) => ({
          fider: `Ф${number} → ${station} → ${location}`, 
          title,
        })))
  },

  methods: {
    cableClick() {
      console.log('click');
    }
  }
}
</script>

<style scoped>

</style>
