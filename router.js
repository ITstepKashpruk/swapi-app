import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Films from './views/films';
// import Planets from './views/planets';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/films',
			name: 'films',
			component: Films,
			component: () => import( /* webpackChunkName: "films" */ './views/films'),
		},
		{
			path: '/films/:id',
			name: 'film',
			component: Films,

			component: () => import( /* webpackChunkName: "Film" */ './views/films/Film.vue'),
		},
		{
			path: '/planets',
			name: 'Planets',

			component: () => import( /* webpackChunkName: "planets" */ './views/planets'),
		},
		{
			path: '/planets/:id',
			name: 'Planet',

			component: () => import( /* webpackChunkName: "Planet" */ './views/planets/Planet.vue'),
		},
		{
			path: '/people',
			name: 'People',

			component: () => import( /* webpackChunkName: "planets" */ './views/people'),
		},
		{
			path: '/people/:id',
			name: 'Person',

			component: () => import( /* webpackChunkName: "Planet" */ './views/people/Person.vue'),
		},
		{
			path: '/species',
			name: 'Species',

			component: () => import( /* webpackChunkName: "planets" */ './views/species'),
		},
		{
			path: '/species/:id',
			name: 'Species',

			component: () => import( /* webpackChunkName: "Planet" */ './views/species/Species.vue'),
		},
	],
});