<template>
	<div class="meeting">
		<template v-if="showTable">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
		  <el-form-item label="客户名称">
		    <el-input v-model="formInline.user" placeholder="请输入客户名称"></el-input>
		  </el-form-item>
		  <el-form-item label="区域名称">
		    <el-input v-model="formInline.region" placeholder="请输入区域"></el-input>
		  </el-form-item>
		  <template>
			  <div class="block">
			    <span class="demonstration">默认</span>
			    <el-date-picker
			      v-model="date"
			      type="daterange"
			      range-separator="至"
			      unlink-panels
			      value-format="yyyy-MM-dd"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
			  </div>
			</template>
		  	<el-form-item>
			  <el-button type="primary" @click="checkRecord">查询</el-button>
			  <el-button type="primary" @click="exportExcel">导出</el-button>
			  <el-button type="primary" @click="addNew">新建</el-button>
			</el-form-item>
		</el-form>
		<template>
		    <el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="id" label="会议室id" width="180"></el-table-column>
		      <el-table-column :formatter="formatter" prop="created_at" label="创建时间" width="180"></el-table-column>
		      <el-table-column prop="name" label="会议室名称"></el-table-column>
		      <el-table-column prop="manager_mobile" label="管理电话"></el-table-column>
		      <el-table-column prop="manager" label="管理人"></el-table-column>
		      <el-table-column prop="city" label="城市"></el-table-column>
		      <el-table-column prop="address" label="操作">
		      	<template slot-scope="scope">
		      		<el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
        			<el-button type="text" size="small">删除</el-button>
        			<el-button type="text" size="small">预定会议室</el-button>
		      	</template>
		      </el-table-column>
		    </el-table>
		</template>
		</template>
		<template v-else>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
			  <el-form-item style="display:none;" label="" prop="demo">
			    <el-input v-model="ruleForm.demo"></el-input>
			  </el-form-item>
			  <el-form-item style="display:none;" label="" prop="demo">
			    <el-input v-model="ruleForm.demo"></el-input>
			  </el-form-item>
			  <el-form-item style="display:none;" label="" prop="demo">
			    <el-input v-model="ruleForm.demo"></el-input>
			  </el-form-item>
			  <el-form-item label="会议室名称:" prop="roomName">
			    <el-input v-model="ruleForm.roomName"></el-input>
			  </el-form-item>
			  <el-form-item label="城市:" prop="city">
			    <el-input v-model="ruleForm.city"></el-input>
			  </el-form-item>
			  <el-form-item label="管理人:" prop="manager">
			    <el-input v-model="ruleForm.manager"></el-input>
			  </el-form-item>
			  <el-form-item label="管理人手机:" prop="managerPhone">
			    <el-input v-model="ruleForm.managerPhone"></el-input>
			  </el-form-item>
			  <el-form-item label="容纳人数:" prop="containNum">
			    <el-input v-model="ruleForm.containNum"></el-input>
			  </el-form-item>
			  <el-form-item label="开放时间段:" prop="dateStart">
			    <el-time-select
				  v-model="ruleForm.dateStart"
				  :picker-options="{
				    start: '09:00',
				    step: '00:60',
				    end: '21:00'
				  }"
				  placeholder="起始时间">
				</el-time-select>
			  </el-form-item>
			  <el-form-item prop="dateEnd">
				<el-time-select
				  placeholder="结束时间"
				  v-model="ruleForm.dateEnd"
				  :picker-options="{
				    start: '09:00',
				    step: '00:60',
				    end: '21:00',
				    minTime: ruleForm.dateStart
				  }">
				</el-time-select>
			  </el-form-item>
			  <el-form-item label="优惠时间段:" prop="saleStart">
			    <el-time-select
				  v-model="ruleForm.saleStart"
				  :picker-options="{
				    start: '09:00',
				    step: '00:60',
				    end: '21:00'
				  }"
				  placeholder="起始时间">
				</el-time-select>
			  </el-form-item>
			  <el-form-item prop="saleEnd">
					<el-time-select
					  placeholder="结束时间"
					  v-model="ruleForm.saleEnd"
					  :picker-options="{
					    start: '09:00',
					    step: '00:60',
					    end: '21:00',
					    minTime: ruleForm.saleStart
					  }">
					</el-time-select>
			  </el-form-item>
			  <el-form-item label="单价(元/小时)" prop="price">
			    <el-input v-model="ruleForm.price"></el-input>
			  </el-form-item>
			  <el-form-item label="vip单价(元/小时)" prop="vip">
			    <el-input v-model="ruleForm.vip"></el-input>
			  </el-form-item>
			  <el-form-item label="区域" prop="area">
			    <el-input v-model="ruleForm.area"></el-input>
			  </el-form-item>
			  <el-form-item label="区域" prop="area">
			    <el-input
				  type="textarea"
				  :rows="5"
				  placeholder="请输入内容"
				  v-model="textarea">
				</el-input>
			  </el-form-item>
			</el-form>
			<div class="title">请上传图片</div>
			<el-upload
			  class="avatar-uploader"
			  action="http://space.it-weyoung.com/admin/file"
			  name="uploads[]"
			  :headers="headers"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<el-button type="primary" @click="realAdd('ruleForm')">确定</el-button>
			<el-button @click="realCancel">取消</el-button>
		</template>
	</div>
</template>

<script>
	import axios from 'axios'

	const SIZE = 10
	let page = 1;

	export default {
	  data() {
	    return {
	      textarea: "",
	      imageUrl: "",
	      fileId: "",
	      showTable: true,
	      formInline: {
	        user: '',
	        region: ''
	      },
	      date: ['2016-11-07','2017-11-07'],
	      tableData: [],
	      ruleForm: {
	      	demo: '',
	      	roomName: '',
	      	city: '',
	      	manager: "",
	      	managerPhone: "",
	      	containNum: "",
	      	dateStart: "",
	      	dateEnd: "",
	      	saleStart: "",
	      	saleEnd: "",
	      	price: '',
	      	vip: "",
	      	area: "深圳",
	      	fileId: ""
	      },
	      rules: {
	      	roomName: [
	      		{ required: true, message: '请输入会议室', trigger: 'blur' }
	      	],
	      	city: [
	      		{ required: true, message: '请输入城市', trigger: 'blur' }
	      	],
	      	manager: [
	      		{ required: true, message: '请输入管理人', trigger: 'blur' }
	      	],
	      	managerPhone: [
	      		{ required: true, message: '请输入管理人手机', trigger: 'blur' }
	      	],
	      	containNum: [
	      		{ required: true, message: '请输入容纳人数', trigger: 'blur' }
	      	],
	      	dateStart: [
	      		{ required: true, message: '请输入时间', trigger: 'blur' }
	      	],
	      	dateEnd: [
	      		{ required: true, message: '请输入时间', trigger: 'blur' }
	      	],
	      	saleStart: [
	      		{ required: true, message: '请输入时间', trigger: 'blur' }
	      	],
	      	saleEnd: [
	      		{ required: true, message: '请输入时间', trigger: 'blur' }
	      	],
	      	price: [
	      		{ required: true, message: '请选单价', trigger: 'blur' }
	      	],
	      	vip: [
	      		{ required: true, message: '请选vip单价', trigger: 'blur' }
	      	]
	      },
	      fileList2: [
		    {
		     name: 'food.jpeg',
		     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
		    },
		    {
		     name: 'food2.jpeg',
		     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
		    }
	      ]
	    }
	  },
	  created() {
	  	let $this = this
	  	if(window.localStorage.getItem("isLogin")){
	  		console.log("会议室")
	  		$this.getList({});
		}
	  },
	  computed: { // 计算属性
	  	headers() {
	  		let $this = this
	  		let key = $this.$store.getters.token_type+' '+$this.$store.getters.token
	  		return {
	  			Authorization: key
	  		}
	  	}
	  },
	  methods: {
	  	formatter(row,column) { // 用组件 中的formatter
	  		// console.log(row,column)
	  		return row.created_at.split(" ")[0]
	  	},
	    onSubmit() {
	      console.log('submit!');
	    },
	    checkRecord(){
	    	console.log(this.formInline.user)
	    	console.log(this.formInline.region)
	    	console.log(this.date)
	    },
	    exportExcel() {

	    },
	    addNew() {
	    	this.showTable = !this.showTable
	    },
	    editItem(item) {

	    },
	    getList(){
	    	let username = this.formInline.user;
	    	let space = this.formInline.region;
	    	let start = this.date[0]
	    	let end = this.date[1]
	    	let $this = this

	    	axios.post('admin/croom/list',{
	    		user_name: username,
	        	space_name: space,
	        	time_start: start,
	        	time_end: end,
	        	page: page,
	        	size: SIZE
	    	}).then(res => {
	    		let data = res.data.resp
	    		if(data.respCode === '000000'){
	    			$this.tableData = data.respMsg.list;
	    		}
	    	})
	    },
	    realAdd(ruleForm){
	    	let $this = this
	    	this.$refs[ruleForm].validate((valid) => {
	    		if(valid){
	    			if(!$this.fileId) {
	    				$this.$message("请上传图片")
	    				return;
	    			}
	    			this.uploadRoom()
	    		}else{

	    		}
	    	})
	    },
	    uploadRoom() {
	    	let obj = {
	    		id: "",
	    		name: this.ruleForm.roomName,
	    		city: this.ruleForm.city,
	    		manager: this.ruleForm.manager,
	    		manager_mobile: this.ruleForm.managerPhone,
	    		main_photo: this.fileId,
	    		area: "深圳",
	    		price: this.ruleForm.price,
	    		description: "",
	    		content: "",
	    		people: this.ruleForm.containNum,
	    		open_time_start: this.ruleForm.dateStart,
	    		open_time_end: this.ruleForm.dateEnd,
	    		deductible_time_start: this.ruleForm.saleStart,
	    		deductible_time_end: this.ruleForm.saleEnd,
	    		vip_price: this.ruleForm.vip
	    	}
	    	
	    	axios.post("admin/croom/update",obj).then(res => {

	    	})
	    },
	    realCancel() {
	    	this.showTable = !this.showTable
	    },
	    handleAvatarSuccess(res, file) { // 测试 upload
	      this.imageUrl = URL.createObjectURL(file.raw);
	      console.log(res,file)
	      let data = res.resp;
	      if(data.respCode === "000000"){
	      	this.fileId = data.respMsg.files[0].id
	      }
	    },
	    beforeAvatarUpload(file,id) {
	      	return true
	    }
	  }
	}
</script>

<style scoped>
	.title {
		color: #5a5e66;
		font-size: 14px;
		padding-left: 45px;
	}
	.demonstration {
		display: inline-block;
		color: #5a5e66;
		font-size: 14px;
		margin-right: 12px;
	}
	.block {
		margin-bottom: 15px;
	}
	.demo-ruleForm .el-input{
		width: 40%;
	}
	.demo-ruleForm .el-textarea {
		width: 40%;
	}
	.avatar-uploader {
		padding-left: 105px;
	}
	.avatar-uploader .el-upload {
	  border: 1px dashed #d9d9d9;
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	  border-color: #409EFF;
	}
	.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 178px;
	  height: 178px;
	  line-height: 178px;
	  text-align: center;
	}
	.avatar {
	  width: 178px;
	  height: 178px;
	  display: block;
	}
</style>