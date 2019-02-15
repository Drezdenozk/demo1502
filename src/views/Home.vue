<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/stickers-muraux-star-wars-logo.jpg" width="150">
    <starships/>
  </div>
</template>

<script>
import Starships from '@/components/starship-grid/Starships-list.vue';

export default {
  name: 'home',
  metaInfo: {
    title: 'Wellcome to our shipyards',
  },
  components: {
    Starships,
  },
};
</script>
