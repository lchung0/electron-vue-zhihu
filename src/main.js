import Vue from 'vue'
import vueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store/store.js'
import $ from 'jquery'

require('../node_modules/materialize-css/dist/js/materialize.min.js')

$(window).on('keydown', event => {
	event.preventDefault()
	if(event.keyCode === 116)
		location.reload()
})//全局响应F5刷新

let eventHandler = new Vue() //vue2.0,代替$broadcast响应事件传递
window.eventHandler = eventHandler

Vue.use(vueRouter)
Vue.use(Vuex)

let routes = [
	{
		path: '/',
		component: require('./App.vue'),
		redirect: '/main',
		children: [
			{
				path: 'main',
				component: require('./views/mainPage.vue')
			},
			{
				path: 'article/:id',
				component: require('./components/articleDetail.vue')
			}
		]
	}
	
]

let router = new vueRouter({routes: routes})

new Vue({
  el: '#app',
  router: router,
  store
})
