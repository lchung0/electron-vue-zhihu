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

var router = new vueRouter()

router.map({
	'/':{
		component: require('./App.vue'),
		subRoutes: {
			'main': {
				name: 'main',
				component: require('./views/mainPage.vue')
			},
			'test': {
				name: 'test',
				component: require('./views/test.vue')
			}
		}
	}
})
router.start(Vue.extend({}),'#app')
