<template>
  <div class="starships">
    <div class="starships--list">
      <template v-if="connectionError">
        Sorry, we have an error with connecting to our shipyard =(
      </template>
      <template v-else-if="starshipsList.length" v-for="starship in starshipsList">
        <starship :key="starship.model" :info="starship"></starship>
      </template>
    </div>
  </div>
</template>

<script>
import Starship from '@/components/Starship.vue';

export default {
  name: 'Starships',
  data() {
    return {
      starshipsList: [],
      connectionError: false,
    };
  },
  components: {
    Starship,
  },
  created() {
    // Проксируем запрос. Привет CORS
    this.$axios.get('/api/starships/')
      .then((starships) => {
        this.connectionError = false;
        this.starshipsList = starships.results;
      })
      .catch((error) => {
        console.dir(error);
        this.connectionError = true;
        this.starshipsList = [];
      });
  },
};
</script>

<style scoped lang="scss">
  .starships--list {
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
