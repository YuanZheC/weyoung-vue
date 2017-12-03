<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>
		<div class="content">
			<transition name="move" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import vHead from './Header.vue'
	import vSidebar from './Sidebar.vue'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			vHead,
			vSidebar
		},
		created() {
			const isLog = this.$store.getters.isLogin;
			// 当直接访问 '/' 时 无法触发 router.beforeEach ,直接在 home组件 加入权限
			// if(!this.isLog){
			// 	this.$router.push({path: '/login'});
			// }
		},
		methods: {
			...mapGetters([
				'isLogin'
			])
		}
	}
</script>
