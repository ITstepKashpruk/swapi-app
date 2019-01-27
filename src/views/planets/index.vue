<template>
  <div class="container">
    <div>
      <div v-for="planet in sortedPlanets" :key="planet.name">
        <router-link :to="getLink(planet.url)">{{planet.name}}</router-link>
      </div>
    </div>
    <Search searchURL="https://swapi.co/api/planets/?search="></Search>
  </div>
</template>

<script>
import axios from 'axios';
import Search from '@/components/Search.vue';

export default {
  components: {
    Search,
  },
  data() {
    return {
      planets: [],
    };
  },
  beforeCreate() {
    axios('https://swapi.co/api/planets')
      .then(response => (this.planets = response.data.results))
      .catch(error => console.log(error));
  },
  methods: {
    getLink(url) {
      const baseURL = 'https://swapi.co/api/';
      return url.slice(baseURL.length);
    },
  },
  computed: {
    sortedPlanets() {
      return this.planets.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
  },
};
</script>

<style>
</style>

