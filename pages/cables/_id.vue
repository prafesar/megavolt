
<template>

  <cable-card :id='$route.params.id'></cable-card>
  
</template>

<script>

import CableCard from '../../components/cables/CableCard';

export default {
  components: {
    CableCard
  },
  
  // first: get data by cable id, then send to CableCard

}

</script>