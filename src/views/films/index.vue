<template>
  <div class="container">
    <div>
      <div v-for="film in sortedFilms" :key="film.title">
        <router-link :to="getLink(film.url)">{{film.title}}</router-link>
      </div>
    </div>
    <Search searchURL="https://swapi.co/api/films/?search="></Search>
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
      films: [],
    };
  },
  beforeCreate() {
    axios('https://swapi.co/api/films')
      .then(response => (this.films = response.data.results))
      .catch(error => console.log(error));
  },
  methods: {
    getLink(url) {
      const baseURL = 'https://swapi.co/api/';
      return url.slice(baseURL.length);
    },
  },
  computed: {
    sortedFilms() {
      return this.films.sort((a, b) => (a.title > b.title ? 1 : -1));
    },
  },
};
</script>

<style>
</style>

