<template>
	<div class="login-wrap">
		<div class="center-wrap">
			<div class="ms-title">微漾后台管理系统</div>
			<div class="ms-login">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
				  <el-form-item label="用户名" prop="name">
				    <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
	    data() {
	      return {
	        ruleForm: {
	        	name: window.localStorage.getItem("adm_user") || '',
	        	pass: window.localStorage.getItem("adm_pass") || ''
	        },
	        rules: {
	        	name: [
	        		{ required: true,message: '请输入用户名',trigger: 'blur' },
	        		{ min: 11,max: 11, message: '长度在11个字符',trigger: 'blur' }
	        	],
	        	pass: [
	        		{ required: true,message: '请输入密码',trigger: 'blur' },
	        		{min: 6,max: 20,message: '最少6位,最多20位',trigger: 'blur'}
	        	]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
	      	let self = this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            self.loginTo({
	            	name: self.ruleForm.name,
	            	pass: self.ruleForm.pass
	            }).then((res) => {
	            	console.log(res)
	            	this.$router.push('/')
	            });
	            // 防止一遍遍重新输入
	            window.localStorage.setItem('adm_user',self.ruleForm.name)
	            window.localStorage.setItem('adm_pass',self.ruleForm.pass)
	            // this.$store.dispatch('LOAD_USER_OUTHA',{
	            // 	name: self.ruleForm.name,
	            // 	pass: self.ruleForm.pass
	            // })

	            let admToken = window.localStorage.getItem("adm_token");
	          } else {
	          	this.$message("你输入有误，检查再输")
	            return false;
	          }
	        });
	      },
	      ...mapActions({
	      	loginTo: 'LOAD_USER_OUTHA'
	      })
	    }
  }
</script>

<style scoped>
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background: #324157;
	}
	.center-wrap {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 400px;
		height: 260px;
		border-radius: 10px;
		padding: 10px 30px 10px 10px;
		background-color: #fff;
	}
	.center-wrap .ms-login {
		margin-top: 50px;
	}
	.center-wrap .ms-title {
		position: absolute;
		top: -53px;
		left: 10px;
		color: #fff;
		font-size: 30px;
		width: 100%;
		text-align: center;
	}
	.center-wrap .el-form {
		text-align: center;
	}
	.center-wrap .el-form label {
		text-align: center;
	}
	.center-wrap .el-form .el-button {
		display: inline-block;
		width: 80%;
		margin: 10px 0 0 15px;
	}
</style>