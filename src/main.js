import Vue from 'vue'
import vueRouter from 'vue-router'
import $ from 'jquery'
import sidebar from './views/sideBar.vue'
window.$ = $

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
			}
		}
	}
})

router.start(Vue.extend({}),'#app')
