<template>
	<div>
		<h1>{{ film.title }}</h1>
		<ul>
			<li>
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
			</li>
			<li v-if="planets.length > 0">
				<ul>Planets:
					<li v-for="(planet, index) in film.planets" :key="planet.name">
						<router-link :to="'/' + getLink(planet)">{{ planets[index] }}</router-link>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<!-- <div>
    <h1>{{ film.title }}</h1>
    <ul>
      <li>
        Episode: {{ film.episode_id }}
      </li>
      <li>
        <p class="text">
          Opening crawl: {{ film.opening_crawl }}
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
      </li>
      <li v-if="planets.length > 0">
        <ul>Planets:
          <li v-for="(planet, index) in film.planets" :key="planet.name">
            <router-link :to="'/' + getLink(planet)">{{ planets[index] }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
>>>>>>> 1bd2f8f2f387e46b37b9c23704b5d340bc6ffe03 -->
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Planet',
    data() {
      return {
        film: {},
        planets: [],
      };
    },
    beforeCreate() {
      const id = this.$route.params.id;
      axios('https://swapi.co/api/films/' + id)
        .then(response => (this.film = response.data))
        .then(response => {
          this.film.planets.forEach(planet => {
            axios(planet)
              .then(response => this.planets.push(response.data.name))
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
