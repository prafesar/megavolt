<template>
  <v-card class="my-4">
    
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>{{fider}}</v-card-subtitle>
    
    <v-card-text>Год: {{year ? year : 'неизвестно'}} <br>
    Возраст: {{year ? 2020 - year : 'неизвестно'}} <br>
    Длинна: {{length ? length : 'неизвестно'}}, км <br>
    Балланс: {{owner ? owner : 'неизвестно'}} <br>
    Описание: {{description}}</v-card-text>
    
  </v-card>
</template>

<script>

export default {
  data() {
    return {}
  },
  
  props: {
    title: String,
    year: Number,
    owner: String,
    length: [Number, String],
    description: String,
    fider: String,
  },

}
</script>

<style>

</style>