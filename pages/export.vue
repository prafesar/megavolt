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
import CableService from '~/services'

function getCableTagList() {
  return CableService.getDataFromCableColl()
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

    printList() {
      printCableTagList();
    },
    getList() {
      return CableService.getCableTagList();
    }

  }
}
</script>

<style>

</style>