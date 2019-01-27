<template>
	<div>
		<!-- <h1>{{ film.title }}</h1> -->
		<ul>
			<!-- <li>
				Episode: {{ film.episode_id }}
			</li>
			<li>
				<p class="text">
					Opening craw: {{ film.opening_crawl }}
				</p>
			</li>
			<li>
				Director: {{ film.director }}
			</li>
			<li>
				Producer: {{ film.producer }}
			</li>
			<li>
				Release data: {{ film.release_date }}
			</li> -->
			<li v-if="films.length > 0">
				<ul>Films:
					<li v-for="(film, index) in people.films" :key="film.title">
						<router-link :to="'/' + getLink(film)">{{ films[index] }}</router-link>
					</li>
				</ul>
				<ul> Species:
					<li v-for="(specie, index) in people.species" :key="specie.name">
						<router-link :to="'/' + getLink(specie)">{{ specie[index] }}</router-link>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'People',
    data() {
      return {
        people: {},
        films: [],
        species: [],
      };
    },
    beforeCreate() {
      const id = this.$route.params.id;
      axios('https://swapi.co/api/people/' + id)
        .then(response => (this.people = response.data))
        .then(response => {
          this.people.films.forEach(film => {
            axios(film)
              .then(response => this.films.push(response.data.title))
              .catch(error => console.log(error));
          });
        })
        .then(response => {
          this.people.species.forEach(species => {
            axios(species)
              .then(response => this.species.push(response.data.name))
              .catch(error => console.log(error));
          });
        });
    },
    methods: {
      getLink(url) {
        const baseURL = 'https://swapi.co/api/';
        return url.slice(baseURL.length);
      },
    },
  };
</script>

<style>
  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
    text-transform: capitalize;
    margin-bottom: 10px;
  }

  p.text {
    max-width: 400px;
    margin: auto;
  }
</style>
