import Vue from 'vue'
import vueRouter from 'vue-router'

window.$ = window.jQuery = require('jquery')
require('../node_modules/materialize-css/dist/js/materialize.min.js')

$(window).on('keydown', event => {
	event.preventDefault()
	if(event.keyCode === 116)
		location.reload()
})

Vue.use(vueRouter)

let routes = [
	{
		path: '/',
		component: require('./App.vue'),
		children: [
			{
				path: 'main',
				component: require('./views/mainPage.vue')
			}
		]
	}
	
]

var router = new vueRouter({routes: routes})

new Vue({
  el: '#app',
  router: router
})
