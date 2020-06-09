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
    addCableCollForEachFider() {
      function getCablesByFider({ team, number }) {
        console.log(team, '   ', number);
        return db.collection('cables')
          .where('fider.team', '==', team)
          .where('fider.number', '==', number)
          .get()
          .then(snap => snap.docs.map(cableSnap => ({ ...cableSnap.data() })))
          .catch(error => {
            console.error('cannot filter cables' + error.message);
            throw new Error;
          })
      }
      
      db.collection('fiders').get()
        // get array of fiders doc
        .then(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        .then(fiders => fiders.forEach(({ id, number, team }) => {
          // for each fider rewrite data
          const fiderRef = db.collection('fiders').doc(id);
         
          // add cables in fider
          const filter = { team, number };
          getCablesByFider(filter)
            .then(cables => cables
              .forEach(cable => fiderRef.collection('cables').add({ ...cable }))
            )
            .catch(error => {
              console.error('cannot add cables in fider ' + error.message);
              throw new Error;
            })
          return;
        }))
    },
    updataCableInfo() {
      return db.collectionGroup('cables')
        .limit(1340)
        .get()
        .then(snap => snap.docs.map(doc => ({ ref:doc.ref, ...doc.data()})))
        .then(cables => cables.map(cable => ({
              ref: cable.ref,
              key: cable.key,
              title: cable.title,
              length: cable.length, 
              owner: cable.owner,
              team: cable.fider.team,
              specCurrent: cable.specCurrent,
              description: cable.description,
              fider: `'Ф${cable.fider.number} → ${cable.fider.team} → ${cable.fider.station} ${cable.fider.section}СШ'`   
            })
          ))
        .catch(error => {
          console.error('error to convert cable data');
          throw new Error;
        })
        .then(cables => cables.forEach(({
            ref, ...rest
          }) => {
            console.log('set cable by id ' + ref.id )
            ref.set({ ...rest })
          }))
          // }) => console.log('set cable by id ' + ref.id + ' team  ' + team) ))
        .then(() => console.log('update is done'))
        .catch(error => {
          console.error('error updating cable info');
          throw new Error;
        })
    },
    async checkCableInfo() {
      const cables = await db.collectionGroup('cables')
        .limit(1340)
        .get()
        .then(snap => snap.docs.map(doc => ({ ref:doc.ref, ...doc.data()})))
      
      cables.forEach(({ fider, ref }) => {
       console.log('ok: ' + ref.id + ' team: ' + fider.team)

      })
    },
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
        console.log('updating cable data: ' + year)
        return ref.set({ tags: tags, year: year }, { merge: true })
      })
    }
  }
}
</script>

<style>

</style>