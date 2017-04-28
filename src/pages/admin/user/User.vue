<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200" sortable>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="100" sortable>
      </el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="220" sortable>
      </el-table-column>
      <el-table-column prop="state" label="状态"  :formatter="formatStatus" width="120" sortable>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" min-width="180" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">

        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="sndPassword">
          <el-input v-model="editForm.sndPassword" auto-complete="off"></el-input>
        </el-form-item>

        <!--<el-form-item label="性别">-->
          <!--<el-radio-group v-model="editForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="年龄">-->
          <!--<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="生日">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="地址">-->
          <!--<el-input type="textarea" v-model="editForm.addr"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">

        <el-form-item label="公司名称" prop="company">
          <el-input v-model="addForm.company" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="sndPassword">
          <el-input v-model="addForm.sndPassword" auto-complete="off"></el-input>
        </el-form-item>


        <!--<el-form-item label="性别">-->
          <!--<el-radio-group v-model="addForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="年龄">-->
          <!--<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="生日">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="地址">-->
          <!--<el-input type="textarea" v-model="addForm.addr"></el-input>-->
        <!--</el-form-item>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import axios from 'axios'
	import util from '@/utils/common'

	import {GET_USERS_URL, REGISTER_URL, MODIFY_USERS_URL, DELETE_USERS_URL, PATCH_DELETE_USERS_URL} from '@/config'
	//import NProgress from 'nprogress'

	export default {
		data() {
      var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.addForm.sndPassword !== '') {
              this.$refs.addForm.validateField('sndPassword');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.addForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };

      var validatePass3 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.editForm.sndPassword !== '') {
              this.$refs.editForm.validateField('sndPassword');
            }
            callback();
          }
        };
        var validatePass4 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.editForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ validator: validatePass3,  trigger: 'blur' }
					],
					sndPassword: [
						{ required: true, message: '请输入第二次密码', trigger: 'blur' },
						{ validator: validatePass4,  trigger: 'blur' }
					],
				},
				//编辑界面数据
				editForm: {
					id: 0,

					company: '',
					name: '',
					password: '',
					sndPassword: '',

					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
				  company: [
						{ required: true, message: '请输入公司名称', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ validator: validatePass,  trigger: 'blur' }
					],
					sndPassword: [
						{ required: true, message: '请确认密码', trigger: 'blur' },
						{ validator: validatePass2,  trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
				  company: '',
					name: '',
					password: '',
					sndPassword: '',


					sex: -1,
					age: 0,
					birth: '',
					addr: ''

				},


			}
		},
		methods: {
			//状态显示转换
			formatStatus: function (row, column) {
				return row.state == "1" ? '正常' : row.state == "0" ? '锁定' : '一般';
			},

			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
        var _that = this
        // 发送请求获取所有用户列表
        axios({
            url: GET_USERS_URL + '?name=' + para.name + '&page=' + para.page,
            method: 'get',
            //data: para,
            //headers: {
            //  'Content-Type': 'application/json'
            // }
          }).then(function (response) {
            console.log("获取用户数据成功");
            console.log(response);
            _that.total = response.data.total
            _that.users = response.data.userlist
            _that.listLoading = false
        }).catch(function (error) {
          // 请求失败
          console.log(error);
        });
				//NProgress.start();
				/*
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
				*/
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };

					var _that = this
          // 发送登录请求
          axios({
              url: DELETE_USERS_URL,
              method: 'post',
              data: para,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (response) {
              if(response.data.success==true){
                _that.listLoading = false;
                _that.$message({
                  message: '删除成功',
                  type: 'success'
                })
                _that.getUsers();
              }else{
                _that.listLoading = false;
                _that.$message.error('删除失败');
              }
          }).catch(function (error) {
            // 请求失败
            console.log(error);
          });


					/*
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
					*/
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);

				if(this.$refs.editForm){
				  this.$refs.editForm.resetFields()
				}
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
				  company:'',
					name: '',
					password:'',
					sndPassword:'',

					sex: -1,
					age: 0,
					birth: '',
					addr: ''

				};
				if(this.$refs.addForm){
				  this.$refs.addForm.resetFields()
				}
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');

              console.log(para);

              var _that = this;
              axios({
                  url: MODIFY_USERS_URL,
                  method: 'post',
                  data: para,
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(function (response) {
                  if(response.data.success==true){
                    _that.editLoading = false;
                    _that.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    _that.$refs['editForm'].resetFields();
                    _that.editFormVisible = false;
                    _that.getUsers();
								  }else{
								    _that.editLoading = false;
                    _that.$message.error('增加失败');
								  }
              }).catch(function (error) {
                // 请求失败
                console.log(error);
              });

							/*
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
							*/

						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');

              var _that = this
              // 发送登录请求
              axios({
                  url: REGISTER_URL,
                  method: 'post',
                  data: para,
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(function (response) {
                  if(response.data.success==true){
                    _that.addLoading = false;
                    _that.$message({
                      message: '提交成功',
                      type: 'success'
                    });
                    _that.$refs['addForm'].resetFields();
                    _that.addFormVisible = false;
                    _that.getUsers();
								  }else{
								    _that.addLoading = false;
                    _that.$message.error('增加失败');
								  }
              }).catch(function (error) {
                // 请求失败
                console.log(error);
              });

						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
          console.log("para...");
          console.log(para);
					var _that = this
          // 发送登录请求
          axios({
              url: PATCH_DELETE_USERS_URL,
              method: 'post',
              data: para,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (response) {
              if(response.data.success==true){
                _that.listLoading = false;
                _that.$message({
                  message: '批量删除成功',
                  type: 'success'
                });
                _that.getUsers();
              }else{
                _that.listLoading = false;
                _that.$message.error('批量删除失败');
              }
          }).catch(function (error) {
            // 请求失败
            console.log(error);
          });


					/*
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
					*/
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>
