<template>
  <v-card class="my-4">
    
    <!-- <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>{{fider.team}} → Ф{{fider.number}} → ПС {{fider.station}} {{fider.section}}СШ</v-card-subtitle>
    
    <v-card-text>Год: {{year ? year : 'неизвестно'}} <br>
    Возраст: {{year ? 2020 - year : 'неизвестно'}} <br>
    Длинна: {{length ? length : 'неизвестно'}}, км <br>
    Балланс: {{owner}} <br>
    Описание: {{description}}</v-card-text> -->
    
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
    length: [Number, String],
    description: String,
    fider: Object,
  },

}
</script>

<style>

</style>