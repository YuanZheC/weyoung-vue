<template>
	<div class="authority">
		<h2 class="title">权限管理</h2>
		<template v-if="showForm">
		  <el-button type="primary">新增角色</el-button>
		  <el-table border :data="tableData" style="width: 80%;">
		    <el-table-column prop="display_name" label="角色名称"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
	    	    	<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	    	    	<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	    	   	</template>
		    </el-table-column>
		  </el-table>
		</template>
		<template v-else>
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="角色名称">
			    <el-input v-model="formInline.user" placeholder="角色名称"></el-input>
			  </el-form-item>
			</el-form>
			<!-- 系统管理 -->
			<el-checkbox disabled v-model="checkAllAdmin">系统管理</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedAdmin">
			  <el-checkbox v-for="item in adminArr" :label="item" :key="item">{{item}}</el-checkbox>
			</el-checkbox-group>
			<!-- 信息管理 -->
			<el-checkbox disabled v-model="checkAllInfo">信息管理</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedInfo">
			  <el-checkbox v-for="item in infoArr" :label="item" :key="item">{{item}}</el-checkbox>
			</el-checkbox-group>
			<!-- 财务管理 -->
			<el-checkbox disabled v-model="checkAllFinance">财务管理</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedFinance">
			  <el-checkbox v-for="item in financeArr" :label="item" :key="item">{{item}}</el-checkbox>
			</el-checkbox-group>
			<!-- 数据统计 -->
			<el-checkbox disabled v-model="checkAllData">数据查询</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedData">
			  <el-checkbox v-for="item in dataArr" :label="item" :key="item">{{item}}</el-checkbox>
			</el-checkbox-group>
			<div>
				<el-button type="primary" @click="submit">确定</el-button>
				<el-button @click="cancel">取消</el-button>
			</div>
		</template>
	</div>
</template>

<script>
	import axios from 'axios'
	// 设置 indeterminate 状态，只负责样式控制
	const adminArr = ['管理员账户', '权限管理', '参数设置', '报警日志'];
	const infoArr = ['客户管理','空间管理','入驻申请','会议室管理'];
	const financeArr = ['财务管理','租约记录','空间订单','会议室订单'];
	const dataArr = ['租户统计','月度统计']
	const admCopy = {
		'管理员账户': 5,
		'权限管理': 6,
		'参数设置': 7,
		'报警日志': 8
	}
	const infoCopy = {
		'客户管理': 9,
		'空间管理': 10,
		'入驻申请': 11,
		'会议室管理': 20
	}
	const finCopy = {
		'财务管理': 12,
		'租约记录': 18,
		'空间订单': 19,
		'会议室订单': 21
	}
	const dataCopy = {
		'租户统计': 14,
		'月度统计': 15
	}

	export default {
		data() {
			return {
				showForm: true,
				tableData: [],
				userid: 0,
				formInline: {
					user: ""
				},
				checkAllAdmin: true,
		        checkedAdmin: [],
		        adminArr: adminArr,
		        checkAllInfo: true,
		        checkedInfo: [],
		        infoArr: infoArr,
		        checkAllFinance: true,
		        checkedFinance: [],
		        financeArr: financeArr,
		        checkAllData: true,
		        dataArr: dataArr,
		        checkedData: []
			}
		},
		created() {
			if(window.localStorage.getItem("isLogin")){
				this.getList({});
			}
		},
		methods: {
			getList() {
				let $this = this;
				axios("admin/roles/list",{}).then(res => {
					let data = res.data.resp;
					if(data.respCode === "000000"){
						$this.tableData = data.respMsg.roles;
					}else{
						$this.$message("出错了");
					}
				})
			},
			handleDelete(index,item) {

			},
			handleEdit(index,item) {
				this.showForm = !this.showForm;
				// console.log(item)
				this.formInline.user = item.display_name
				this.userid = item.id;
			},
		    submit(){
		    	let $this = this
		    	let arr1 = this.checkedAdmin
		    	let arr2 = this.checkedInfo
		    	let arr3 = this.checkedFinance
		    	let arr4 = this.checkedData

		    	let arr1Copy = [1]
		    	let arr2Copy = [2]
		    	let arr3Copy = [3]
		    	let arr4Copy = [4]

		    	arr1.forEach(function(item,index){
		    		arr1Copy.push(admCopy[item])
		    	})
		    	arr2.forEach(function(item,index){
		    		arr2Copy.push(infoCopy[item])
		    	})
		    	arr3.forEach(function(item,index){
		    		arr3Copy.push(finCopy[item])
		    	})
		    	arr4.forEach(function(item,index){
		    		arr4Copy.push(dataCopy[item])
		    	})

		    	let result = arr1Copy.concat(arr2Copy).concat(arr3Copy).concat(arr4Copy);
		    	let id = this.userid
		    	let user = this.formInline.user

		    	axios.post('admin/roles/update',{
		    		id: id,
		    		permissions: result,
		    		display_name: user,
		    		name: "",
		    		description: ""
		    	}).then(res => {
		    		if(res.data.resp.respCode === "000000"){
		    			$this.$message("编辑成功");
		    			$this.showForm = !$this.showForm
		    		}
		    	})
		    },
		    cancel(){
		    	this.showForm = !this.showForm
		    }
		}
	}
</script>

<style scoped>
	.title {
		margin-bottom: 20px;
	}
	.el-button {
		margin: 10px 0;
	}
	.el-checkbox-group {
		margin-bottom: 15px;
	}
	/*.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
		background-color: #409EFF;
    	border-color: #409EFF;
	}*/
</style>