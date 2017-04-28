<template>

  <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="company">
      <el-input type="text" v-model="loginForm.company" auto-complete="off" placeholder="公司名称"></el-input>
    </el-form-item>

    <el-form-item prop="name">
      <el-input type="text" v-model="loginForm.name" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>

    <p v-if="errorMsg" style="color:red;text-align:center;width:100%;">
      {{errorMsg}}
    </p>


    <!--<router-link id="reg" to="/forgetPw">忘记密码</router-link>-->
    <!--<router-link id="reg" to="/register">注册</router-link>-->

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
    <!--<el-form-item style="width:100%;">-->
      <!--<el-button type="primary" style="width:100%;" @click.native.prevent="handleReset2">重置</el-button>-->
    <!--</el-form-item>-->
  </el-form>
</template>

<script>
  import axios from 'axios'
  import { LOGIN_URL, SAVE_COOKIE_TIME } from '@/config'

  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          company:'',
          name: '',
          password: ''
        },
        errorMsg:'',
        rules2: {
          company: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.loginForm.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            this.errorMsg = ""
            //NProgress.start();
            let loginParam = {
              "company":$.trim(this.loginForm.company),
              "name":$.trim(this.loginForm.name),
              "password":$.trim(this.loginForm.password),
            }
            var _that = this
            // 发送登录请求
            axios({
                url: LOGIN_URL,
                method: 'post',
                data: loginParam,
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(function (response) {
                console.log(response)
                // 请求成功
                if(response.data.success == true){
                  // 登录成功
                  console.log("登录成功..." + response.data.user.roles)
                  //console.log()
                  // 根据角色来判断哪些路由显示
                  // 保存用户信息
                  _that.$store.commit('UPDATE_USER_INFO', response.data.user)

                  // 保存cookie
                  let expireDays = SAVE_COOKIE_TIME
                  _that.setCookie('session', JSON.stringify(response.data.user), expireDays);
                    // url跳转
                    _that.$router.push({"name":"main"})
                  }else{
                     _that.errorMsg = response.data.msg
                  }
                  _that.logining = false;
            }).catch(function (error) {
              // 请求失败
              console.log(error);
              _that.logining = false;
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
