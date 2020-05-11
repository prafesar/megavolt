<template>
  <div>
    <p>Cable Search</p>
    <p v-for="cable in cables" :key="cable.id">{{cable.title}}</p>
  </div>
</template>

<script>
import CableCard from '~/components/cables/CableCard';
import { CableService } from '~/components/services';

export default {

  data() {
    return {
      fider: 102,
      limit: 10,
      cables: [],
    }
  },

  created() {
    CableService
      .getCables({
        fider: this.fider,
        limit: this.limit,
      })
      .then(cables => this.cables = cables)
  }

}
</script>

<style scoped>

</style>
