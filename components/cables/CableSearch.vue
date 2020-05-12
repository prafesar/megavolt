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
            <v-card>
              
                <v-card-subtitle>{{cable.fider.team}} → Ф{{cable.fider.number}} → ПС {{cable.fider.station}} {{cable.fider.section}}СШ</v-card-subtitle>
               
                <v-card-text>Год: {{cable.year ? cable.year : 'неизвестно'}} <br>
                Возраст: {{cable.year ? 2020 - cable.year : 'неизвестно'}} <br>
                Длинна: {{cable.length ? cable.length : 'неизвестно'}}, км <br>
                Балланс: {{cable.owner}} <br>
                Описание: {{cable.description}}</v-card-text>
               
              <v-card-actions>
                <!-- <nuxt-link to="cables/:id">...карточка</nuxt-link> -->
              </v-card-actions>
            
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
