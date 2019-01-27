<template>
	<div class="container">
		<div>
			<div v-for="person in sortedPeople" :key="person.name">
				<router-link :to="getLink(person.url)">{{person.name}}</router-link>
			</div>
		</div>
		<Search searchURL="https://swapi.co/api/people/?search="></Search>
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
        people: [],
      };
    },
    beforeCreate() {
      axios('https://swapi.co/api/people')
        .then(response => (this.people = response.data.results))
        .catch(error => console.log(error));
    },
    methods: {
      getLink(url) {
        const baseURL = 'https://swapi.co/api/';
        return url.slice(baseURL.length);
      },
    },
    computed: {
      sortedPeople() {
        return this.people.sort((a, b) => (a.name > b.name ? 1 : -1));
      },
    },
  };
</script>

<style>
</style>

