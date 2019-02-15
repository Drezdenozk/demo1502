<template>
  <div class="starship-card">
    <router-link :to="consumeURL(info.url)"
                 tag="div"
                 :class="'starship-card--block'"
    >
      <div class="starship-card--name">
        {{info.name}}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Starship',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  methods: {
    consumeURL(url) {
      try {
        const id = url.split('/');
        return `/starship/${id[id.length - 2]}`;
      } catch (e) {
        return '/404';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .starship-card {
    margin: 0 0px 20px;
    padding: 0 20px;
    width: 25%;
    &--block {
      text-align: center;
      border: 1px solid black;
      border-radius: 5px;
      padding: 20px 0;
      transition: 500ms all ease;
    }
    &--name {
      font-size: 13px;
    }
    &:hover {
      .starship-card--block {
        cursor: pointer;
        box-shadow: 0px 0px 16px 6px #bebebe;
      }
    }
  }
</style>
