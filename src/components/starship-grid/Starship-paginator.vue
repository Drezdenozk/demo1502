<template>
  <div class="starship-pagination">
    <button class="starship-pagination--page"
            :class="{'starship-pagination--page__disabled': currentPage === 1}"
            @click="currentPage === 1 ? undefined : prev()">-prev</button>
    <div v-for="page in total" :key="`p-${page}`">
      <button class="starship-pagination--page"
              @click="$emit('changePage', page)"
              :class="{'starship-pagination--page__active': currentPage === page}">
        {{page}}
      </button>
    </div>
    <button class="starship-pagination--page"
            :class="{'starship-pagination--page__disabled': currentPage === total}"
            @click="currentPage === total ? undefined : next()">next-</button>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    total: {
      required: true,
      type: Number,
    },
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page, 10) || 1;
    },
  },
  methods: {
    next() {
      this.$emit('changePage', this.currentPage + 1);
    },
    prev() {
      this.$emit('changePage', this.currentPage - 1);
    },
  },
};
</script>

<style scoped lang="scss">
  .starship-pagination {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;

    &--page {
      margin: 0 10px;
      &__active {
        background: grey;
        border-color: grey;
        color: white;
      }

      &__disabled {
        cursor: none;
        opacity: 0.5;
        color: grey;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
