import Vue from 'vue'
import vueRouter from 'vue-router'
import $ from 'jquery'

window.$ = $

$(window).on('keydown', event => {
	event.preventDefault()
	if(event.keyCode === 116)
		location.reload()
})

require('../node_modules/materialize-css/dist/js/materialize.min.js')
Vue.use(vueRouter)

var router = new vueRouter()

router.map({
	'/':{
		component: require('./App.vue'),
		subRoutes: {
			'main':{
				name: 'main',
				component: require('./views/mainPage.vue')
			}
		}
	}
})
router.start(Vue.extend({}),'#app')
