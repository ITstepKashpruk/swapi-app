<template>
  <div>
    <h1>{{ planet.name }}</h1>
    <ul>
      <li>
        Population: {{ planet.population }}
      </li>
      <li>
        Diameter: {{ planet.diameter }}
      </li>
      <li>
        Climate: {{ planet.climate }}
      </li>
      <li>
        Rotation period: {{ planet.rotation_period }}
      </li>
      <li>
        Orbital period {{ planet.orbital_period }}
      </li>
      <li>
        Terrain: {{ planet.terrain }}
      </li>
      <li v-if="films.length > 0">
        <ul>Films:
          <li v-for="(film, index) in planet.films" :key="film">
            <router-link :to="'/' + getLink(film)">{{ films[index] }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Planet',
  data() {
    return {
      planet: {},
      films: [],
    };
  },
  beforeCreate() {
    const id = this.$route.params.id;
    axios('https://swapi.co/api/planets/' + id)
      .then(response => (this.planet = response.data))
      .then(response => {
        this.planet.films.forEach(film => {
          axios(film)
            .then(response => this.films.push(response.data.title))
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
</style>
