import Vue from 'vue'
import vueRouter from 'vue-router'
import $ from 'jquery'
import sidebar from './views/sideBar.vue'
window.$ = $

//require('../node_modules/materialize-css/dist/css/materialize.css')
require('../node_modules/materialize-css/dist/js/materialize.min.js')

Vue.use(vueRouter)

var router = new vueRouter()

router.map({
	'/':{
		component: require('./App.vue'),
		subRoutes: {
			'/index':{
				name: 'index',
				component: require('./views/index.vue')
			},
			'/news': {
				name: 'news',
				component: require('./views/news.vue')
			},
			'/detail/:detailId': {
				name: 'detail',
				component: require('./views/detail.vue')
			},
			'/theme/:themeId': {
				name: 'theme',
				component: require('./views/theme.vue')
			}
		}
	}
})

router.start(Vue.extend({}),'#app')
