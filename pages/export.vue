<template>
  <div>
    <v-btn
      my-8
      @click.prevent="setCableTags"
    >
      setCableTags
    </v-btn>

  </div>
</template>

<script>

import db from '~/firebase/db';
import _ from 'lodash';
import cablesData from '~/services/cables-year';


export default {
  methods: {
    async setCableTags() {
      const cables = await db.collectionGroup('cables')
        .limit(1340)
        .get()
        .then(snap => snap.docs.map(doc => {
          if (doc.exists) {
            return ({ ref:doc.ref, ...doc.data()})
          }
        }))
      
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
    }
  }
}
</script>

<style>

</style>