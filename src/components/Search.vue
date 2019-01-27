<template>
  <div class="search">
    <input class="search__input" type="search" name="search" v-model="searchText" @input="getResults(searchText)">
    <div class="search-results" v-if="searchResults.length > 0">
      <div class="search-results__item" v-for="item in searchResults" :key="item.name">
        <router-link :to="getLink(item.url)"> {{item.name || item.title}} </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Search',
  props: {
    searchURL: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchText: '',
      searchResults: [],
    };
  },
  methods: {
    getResults(searchText) {
      axios(this.searchURL + this.searchText)
        .then(response => (this.searchResults = response.data.results))
        .catch(error => console.log(error));
    },
    getLink(url) {
      const baseURL = 'https://swapi.co/api/';
      return url.slice(baseURL.length);
    },
  },
};
</script>

<style>
.search {
  position: relative;
}
.search-results {
  border: 1px solid rgb(238, 238, 238);
  position: relative;
}
.search-results__item:hover {
  background-color: lightgrey;
  cursor: pointer;
}
.search-results__item:not(:last-child) {
  border-bottom: 1px solid rgb(238, 238, 238);
}

.search-results__item a {
  text-decoration: none;
}
</style>
