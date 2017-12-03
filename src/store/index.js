import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		userInfo: {
			name: '',
			id: "",
			phone: '',
			isLogin: false
		},
		baseURL: 'http://space.it-weyoung.com/'
	},
	actions: {
		LOAD_USER_OUTHA(state,params) {
			return axios.post('http://space.it-weyoung.com/admin/oauth/token',{
				grant_type: "password",
	        	client_id: 3,
	        	client_secret: "ZffWIz4NSsXqLTVgQdGH6awogIEKm7vymkS3dHFX",
	        	username: params.name,
	        	password: params.pass
			}).then((response) => {
				let data = response.data;
				if(data.access_token){
					state.commit('SET_PROJECT_LIST',{
						access_token: data.access_token,
						token_type: data.token_type,
						isLogin: true,
					});

					window.localStorage.setItem("adm_token",data.access_token)
					window.localStorage.setItem("adm_token_type",data.token_type)
					axios.defaults.baseURL = 'http://space.it-weyoung.com/'
					axios.defaults.headers.common['Authorization'] = data.token_type+" "+data.access_token;
					axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				}
				return Promise.resolve(response);
			})
		}
	},
	mutations: {
		SET_PROJECT_LIST: (state,params) => {
			state.token = params.access_token;
			state.type = params.token_type;
			state.userInfo.isLogin = params.isLogin;
		}
	},
	getters: {
		isLogin: state => {
			return state.userInfo.isLogin;
		},
		token: state => {
			return state.token;
		},
		token_type: state => {
			return state.type
		},
		userInfo: state => {
			return state.userInfo
		}
	}
});

export default store