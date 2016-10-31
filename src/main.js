import Vue from 'vue'
import vueRouter from 'vue-router'

window.$ = window.jQuery = require('jquery')
require('../node_modules/materialize-css/dist/js/materialize.min.js')

$(window).on('keydown', event => {
	event.preventDefault()
	if(event.keyCode === 116)
		location.reload()
})//全局响应F5刷新
let eventHandler = new Vue() //vue2.0,代替$broadcast响应事件传递
window.eventHandler = eventHandler

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

let router = new vueRouter({routes: routes})

new Vue({
  el: '#app',
  router: router
})
