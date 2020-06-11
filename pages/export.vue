<template>
  <div>
    <v-btn
      v-if="pageStatus"
      my-8
      @click.prevent="getList"
    >
      Get List
    </v-btn>
    <div v-else>
      <p v-for="err of errors" :key="err"> {{err}} </p>
    </div>
    <p v-for="c of cables" :key="c.id"> {{c.id}} </p>
  </div>
</template>

<script>

import db from '~/firebase/db';
import _ from 'lodash';

/*
* return { id, ref, ...data }
*/
function getDataFromCableColl() {
  return db.collectionGroup('cables')
    .get()
    .then(snap => snap.docs.map(doc => {
      if (doc.exists) {
        return ({ ref:doc.ref, id: doc.id, ...doc.data()})
      }
    }))
}

function getCableTagList() {
  return getDataFromCableColl()
    .then(result => result.map(
      ({ id, tags }) => ({ id, tags })
    ))
}

function printCableTagList() {
  return getCableTagList()
    .then(cables => cables.map(
      curr => `${JSON.stringify(curr)},`
    ))
    .then(res => console.log(
      `[\n${res.join('\n')}\n]`
    ))
}

export default {
  data() {
    return {
      pageStatus: true,
      errors: [],
      cableCount: 0,
      cables: []
    }
  },
  methods: {
    async setCableTags() {
      const cables = await getDataFromCableColl();
      
      cables.forEach(({ ref, key, title, fider }) => {
        const titleTags = _.words(title.toUpperCase());
        const fiderTags = fider.toUpperCase().split(' → ')
          .map(item => item.trim().replace("'", ""));
        const tags = titleTags.concat(fiderTags).filter(item => item !== '→');
        const year = cablesData.find(item => item.key === key).calculated.year;
        console.log('updating cable data: ' + year);
        ref.set({ tags: tags, year: year }, { merge: true });
        return;
      })
    },
    printList() {
      printCableTagList();
    },
    async saveList() {
      const list = await getCableTagList();
      db.collection('cash').doc('cable-list').set({ data: list });
      console.log('i import cable list in cash')
      return;
    },
    getList() {
      db.collection('cash').doc('cable-list').get()
        .then(res => this.cables = res.data().data)
    }

  }
}
</script>

<style>

</style>