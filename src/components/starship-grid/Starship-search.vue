<template>
  <div class="starship-search">
    <label class="starship-search--label" for="search">Search</label>
    <input class="starship-search--input" type="text" id="search"
           @input="save" v-model="search" />
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  data() {
    return {
      search: '',
    };
  },
  created() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
    }
  },
  methods: {
    save() {
      this.$emit('search', this.search);
    },
  },
};
</script>

<style scoped lang="scss">
  .starship-search {
    display: flex;
    justify-content: space-between;
    width: 200px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 40px;

    .starship-search--label {
      line-height: 24px;
      margin-right: 20px;
    }

    .starship-search--input {
      width: 100%;
      padding: 0 5px;
    }
  }
</style>
