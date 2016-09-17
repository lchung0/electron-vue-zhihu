import Vue from 'vue'
import vueRouter from 'vue-router'
import $ from 'jquery'

window.$ = $

Vue.use(vueRouter)

var router = new vueRouter()

router.map({
	'/': {
		name: 'index',
		component: require('./views/index.vue')
	},
	'news': {
		name: 'news',
		component: require('./views/news.vue')
	}
})

router.start(Vue.extend({}),'#app')
