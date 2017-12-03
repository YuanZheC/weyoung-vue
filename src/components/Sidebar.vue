<template>
	<div class="sidebar">
		<el-menu @command="getIndex" router :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu command="item.index" :index="item.index">
						<template class="el-sub-title" slot="title">
							<i :class="item.icon">{{item.title}}</i>
						</template>
						<el-menu-item command="i" v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{subItem.title}}</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item command="item.index" :index="item.index">
						<i :class="item.icon"></i>{{item.title}}
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '系统管理',
                        subs: [
                        	{
                        		index: 'admin',
                        		title: '管理员账户'
                        	},
                        	{
                        		index: 'authority',
                        		title: '权限管理'
                        	},
                        	{
                        		index: 'params',
                        		title: '参数设置'
                        	},
                        	{
                        		index: 'alert',
                        		title: '报警日志'
                        	}
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '信息管理',
                        subs: [
                            {
                                index: 'customer',
                                title: '客户管理'
                            },
                            {
                                index: 'space',
                                title: '空间管理'
                            },
                            {
                            	index: 'meeting',
                            	title: '会议室管理'
                            },
                            {
                            	index: 'active',
                            	title: '活动管理'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                // console.log(this.$route.path)
                // console.log(this.$route.path.replace('/',''))
                return this.$route.path.replace('/','');
            }
        },
        methods: {
            getIndex(command){
                console.log(command)
            }
        }
    }
    // theme 主题
    // el-menu unique-opened 是否只保持一个子菜单的展开
    // el-menu router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #324157;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu,.el-menu-item {
    	color: #bfcbd9;
    	background: #324157;
    }
    .el-menu .el-menu-item:hover, .el-menu .el-submenu__title:hover {
	    background-color: #48576a;
	}
	.el-menu-item.is-active {
	    color: #409EFF;
	}
</style>