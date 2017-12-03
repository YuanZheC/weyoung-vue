<template>
	<div class="adm">
		<template v-if="showFlag">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="客户名称">
				  <el-input v-model="form.name"></el-input>
				  <el-button class="btn-new" @click="getList" type="primary">查询</el-button>
				  <el-button type="primary" @click="addNew">新建</el-button>
				</el-form-item>
			</el-form>
	    	<el-table border :data="tableData" style="width: 100%">
	    	 <el-table-column prop="name" label="账号" width="180"></el-table-column>
	    	 <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
	    	 <el-table-column prop="email" label="电子邮箱" width="180"></el-table-column>
	    	 <el-table-column prop="true_name" label="姓名" width="180"></el-table-column>
	    	 <el-table-column label="操作">
	    	   <template slot-scope="scope">
	    	     <el-button size="mini"
	    	       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	    	     <el-button size="mini" type="danger"
	    	       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	    	   </template>
	    	 </el-table-column>
		    </el-table>
		</template>
		<template v-else>
			<el-form ref="formNew" :rules="rules" :model="formNew" label-width="80px">
				<!-- 为何摆在第一个就无法验证 -->
				<el-form-item prop="name" label="">
				  <el-input style="display:none;" v-model="formNew.id"></el-input>
				</el-form-item>
				<el-form-item prop="name" label="账号">
				  <el-input v-model="formNew.name"></el-input>
				</el-form-item>
				<el-form-item prop="username" label="姓名">
				  <el-input v-model="formNew.username"></el-input>
				</el-form-item>
				<el-form-item prop="password" label="账号密码">
				  <el-input v-model="formNew.password"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="手机号码">
				  <el-input v-model="formNew.phone"></el-input>
				</el-form-item>
				<el-form-item prop="email" label="电子邮箱">
				  <el-input v-model="formNew.email"></el-input>
				</el-form-item>
				<el-form-item label="权限" prop="region">
				   <el-select v-model="formNew.region" placeholder="请选择权限">
				     <el-option label="大区经理" value="1"></el-option>
				     <el-option label="管理员" value="2"></el-option>
				     <el-option label="超级管理员" value="3"></el-option>
				   </el-select>
				</el-form-item>
				<el-form-item>
					<el-button class="btn-new" type="primary" @click="submit('formNew')">确定</el-button>
				  	<el-button type="primary" @click="cancelEidt">取消</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'
	import { phoneReg,passWordReg } from '../base/utils.js'

	export default {
		data() {
			var validatePhone = function(rule,value,callback){
				if(value === ""){
					callback(new Error("请输入手机号"))
				}else if(!phoneReg(value)){
					callback(new Error("请输入正确的手机号"));
				}else{
					callback()
				}
			}
			var validatePassword = function(rule,value,callback){
				if(value === ""){
					callback(new Error("请输入密码"))
				}else if(!passWordReg(value) && value != '******'){
					callback(new Error("密码为6-18位的数字,字母或下划线"));
				}else{
					callback()
				}
			}
			return {
				showFlag: true,
				isEdit: false,
				form: {
					name: ""
				},
				formNew: {
					id: "",
					name: "",
					username: "",
					password: "",
					phone: "",
					email: "",
					region: ""
				},
				rules: {
					name: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					],
					username: [
						{required: true,message: '请输入姓名',trigger: 'blur'}
					],
					password: [
						{validator: validatePassword,trigger: 'blur'}
					],
					phone: [
						{validator: validatePhone,trigger: 'blur'}
					],
					email: [
						{required: true,message: '请输入邮箱',trigger: 'blur'}
					],
					region: [
          			  { required: true, message: '请选择活动区域', trigger: 'change' }
          			]
				},
				tableData: []
			}
		},
		created() {
			if(window.localStorage.getItem("isLogin")){
				this.getList({});
			}
		},
		methods: {
			submit(formName){
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid){
						let arr = [];
						if(self.formNew.region) arr.push(self.formNew.region)

						let obj = {
							id: self.formNew.id || "",
							roles: arr || [],
							name: self.formNew.name || "",
							phone: self.formNew.phone || "",
							email: self.formNew.email || "",
							true_name: self.formNew.username || "",
							password: self.formNew.password || ""
						}
						console.log(obj)

						axios.post("admin/admin/update",obj).then(res => {
							let data = res.data.resp;
							if(data.respCode === "000000"){
								self.$message("保存成功");
								self.isShowFlag();
								self.getList({})
							}
						})
					}
				})
			},
			getList(params) {
				let self = this;
				const token = this.$store.getters.token
				const token_type = this.$store.getters.token_type;
				const token_str = token_type+' '+token;

				let sendData = {
					name: (this.form.name || ""),
					phone: ""
				};

				axios.post("admin/admin/list",sendData).then(res => {
					if(res.data.resp.respCode === '000000'){
						let dataArr = res.data.resp.respMsg.admins;
						self.tableData = dataArr;
					}
				})
			},
			clearInfo(item){
				this.formNew.id = item.id || ""
				this.formNew.name = item.phone || ""
				this.formNew.username = item.true_name || ""
				this.formNew.password = item.password ? "******" : ""
				this.formNew.phone = item.phone || ""
				this.formNew.email = item.email || ""
			},
			addNew() {
				this.isShowFlag()
				this.clearInfo({})
			},
			isShowFlag(){
				this.showFlag = !this.showFlag;
			},
			handleEdit(index,item){
				this.isEdit = !this.isEdit;
				this.isShowFlag();
				this.clearInfo(item)
				console.log(index,item)
			},
			handleDelete(index,item){
				let self = this;
				let url = 'admin/admin/delete/' + item.id;
				axios.post(url,{}).then(res => {
					self.$message("删除成功");
					self.getList({});					
				})
			},
			cancelEidt(){
				this.showFlag = !this.showFlag;
			},
			...mapGetters([
		      'userInfo'
		    ])
		}
	}
</script>

<style scoped>
	.btn-new {
		margin-left: 20px;
	}
	.adm .el-input {
		width: 30%;
	}
	.adm .el-table .cell {
		text-align: center;
	}
	table tr td {
		text-align: center;
	}
</style>