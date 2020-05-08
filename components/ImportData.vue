<template>
<div>
    
  <p>Типа Импорт {{text}}</p>
  <v-btn @click="realImport">Real Import</v-btn><br>

</div>
</template>

<script>

import exportData from './data';
import db from './firebaseInit';

export default {
  data() {
    return {
      count: null,
      text: 'dd',
      cables: [],
      fiders: []
    }
  },
  created: function() {
    this.cables = exportData.cables.slice(100, 120);
    this.fiders = exportData.fiders;
    return;
  },
  methods: {
    realImport() {
      this.cables
        .forEach(({ id, ...rest }) => {
          console.log('import cable by id ' + id);
          db.collection('test').add(rest)
        })
      // this.fiders
      //   .forEach(fider => {
      //     console.log('import fider by id ' + fider.key);
      //     db.collection('fiders').add(fider)
      //   })
    },
    test() {
      console.log('click');
      this.cables
        .forEach(({ id, ...rest }) => console.log(rest));
    },
  },
}
</script>

<style>

</style>