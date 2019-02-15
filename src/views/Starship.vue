<template>
  <div class="starship-info">
    <template v-if="loaded">
      <h1>{{info.name}}</h1>
      <table class="starship-info--description">
        <tr v-for="(param, index) in description" :key="index">
          <td><strong>{{param.label}}</strong></td>
          <td>
            <template v-if="typeof param.value === 'object'">
              {{param.value.join(',')}}
            </template>
            <template v-else>
              {{param.value}}
            </template>
          </td>
        </tr>
      </table>
    </template>
    <template v-else>
      On Loading...
    </template>
  </div>
</template>

<script>
export default {
  name: 'Starship',
  metaInfo() {
    return {
      title: this.info.name || '',
    };
  },
  data() {
    return {
      loaded: false,
      info: {},
    };
  },
  computed: {
    name() {
      return this.info.name || '';
    },
    description() {
      return [
        {
          label: 'MGLT',
          value: this.info.MGLT,
        },
        {
          label: 'Cargo capacity',
          value: this.info.cargo_capacity,
        },
        {
          label: 'Consumables',
          value: this.info.consumables,
        },
        {
          label: 'Cost in credits',
          value: this.info.cost_in_credits,
        },
        {
          label: 'Crew',
          value: this.info.crew,
        },
        {
          label: 'Films',
          value: this.info.films,
        },
        {
          label: 'Hyperdrive rating',
          value: this.info.hyperdrive_rating,
        },
        {
          label: 'Length',
          value: this.info.length,
        },
        {
          label: 'Manufacturer',
          value: this.info.manufacturer,
        },
        {
          label: 'Max atmosphering speed',
          value: this.info.max_atmosphering_speed,
        },
        {
          label: 'Passengers',
          value: this.info.passengers,
        },

        {
          label: 'Model',
          value: this.info.model,
        },
        {
          label: 'Pilots',
          value: this.info.pilots,
        },
        {
          label: 'Starship class',
          value: this.info.starship_class,
        },
      ];
    },
  },
  created() {
    this.loaded = false;
    const {
      id,
    } = this.$route.params; // eslint-disable-next-line
    if (isNaN(id)) {
      this.$router.replace('/404');
    }
    // Проксируем запрос. Привет CORS
    this.$axios.get(`/api/starships/${id}/`)
      .then((starship) => {
        this.info = starship;
        this.loaded = true;
      })
      .catch((error) => {
        console.dir(error);
        this.$router.replace('/404');
      });
  },
};
</script>

<style scoped lang="scss">
  .starship-info--description {
    border: 1px solid black;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;

    td {
      border: 1px solid black;
    }
  }
</style>
