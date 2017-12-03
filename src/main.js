import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import '../static/css/main.css'
import store from './store'
import * as filters from './base/filter.js'

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

// state 存放数据
// actions 触发 异步操作
// mutations 触发同步 操作
// geterrs 获取state
// modules 获取 

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

let adToken = window.localStorage.getItem("adm_token")
let adTokenType = window.localStorage.getItem("adm_token_type")
if(adToken && !axios.defaults.headers.common['Authorization']){
	axios.defaults.baseURL = 'http://space.it-weyoung.com/'
	axios.defaults.headers.common['Authorization'] = adTokenType+" "+adToken;
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}

// 这个时候必须等 store 加载完成
router.beforeEach((to, from, next) => {
	let isLogin = router.app.$store.getters.isLogin;
	// 直接从 local中获取数据
	if(!isLogin){ // 未登录时
		if(adToken){
			axios.get("admin/info",{}).then((res) => {
				if(res.data){
					return next()
				}else{
					return next({path: '/login'})
				}
			})
		}else{
			if (to.path !== '/login') { // 路径不等于 login
			    return next({path: '/login'}); // 跳到 login
			}else{
			    next(); // 路径等于 login 就跳转到 login 防止无限循环
			}
		}
	}else{
		console.log("登录")
		if (to.path === '/login') {
		    return next({path: '/'});
		}
		next();
	}
})