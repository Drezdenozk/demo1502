<template>
  <div class="starships">
    <starship-search @search="searchShips"></starship-search>
    <template v-if="loaded">
      <div class="starships--list">
        <template v-if="connectionError">
          Sorry, we have an error with connecting to our shipyard =(
        </template>
        <template v-else-if="starshipsList.length" v-for="starship in starshipsList">
          <starship :key="starship.model" :info="starship"></starship>
        </template>
        <template v-else-if="!starshipsList.length">
          <div class="no-items">
            nothing found...
          </div>
        </template>
      </div>
      <starship-paginator @changePage="changePage" :total="total" v-if="total > 1"/>
    </template>
    <template v-else>
      On Loading...
    </template>
  </div>
</template>

<script>
import Starship from '@/components/starship-grid/Starship-item.vue';
import StarshipSearch from '@/components/starship-grid/Starship-search.vue';
import StarshipPaginator from '@/components/starship-grid/Starship-paginator.vue';

export default {
  name: 'Starships',
  data() {
    return {
      loaded: false,
      starshipsList: [],
      connectionError: false,
      total: 0,
      perPage: 10,
      initPage: this.$route.query.page ? this.$route.query.page : 1,
      initSearch: this.$route.query.search ? this.$route.query.search : false,
    };
  },
  components: {
    Starship,
    StarshipPaginator,
    StarshipSearch,
  },
  created() {
    this.loadShips();
  },
  methods: {
    changePage(page) {
      this.initPage = page;
      this.loadShips();
    },
    loadShips() {
      const url = this.initSearch ? `/api/starships/?search=${this.initSearch}&page=${this.initPage}` : `/api/starships/?page=${this.initPage}`;
      this.loaded = false;
      // Проксируем запрос. Привет CORS
      this.$axios.get(url)
        .then((starships) => {
          this.connectionError = false;
          this.starshipsList = starships.results;
          this.total = Math.ceil(starships.count / this.perPage);
          if (this.initSearch) {
            this.$router.push({
              query: {
                search: this.initSearch,
                page: this.initPage > 1 ? this.initPage : undefined,
              },
            });
          } else {
            this.$router.push({
              query: {
                page: this.initPage > 1 ? this.initPage : undefined,
              },
            });
          }
        })
        .catch((error) => {
          console.dir(error);
          this.connectionError = true;
          this.starshipsList = [];
          this.total = 0;
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    searchShips(val) {
      this.initSearch = val;
      this.initPage = 1;
      this.loadShips();
    },
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
    .no-items {
      width: 100%;
      text-align: center;
    }
  }
</style>
