<template>
  <div>
    <v-btn
      v-if="pageStatus"
      my-8
      @click.prevent=""
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


  }
}
</script>

<style>

</style>