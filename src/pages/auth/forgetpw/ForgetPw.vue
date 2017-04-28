<template>
  <div class="forgetPw">
    <h2> 忘记密码 </h2>
    <!-- 忘记密码框 start -->
    <vue-form :state="formstate" name="resetPwForm"  @submit.prevent="resetPw" role="form">
      <!--<validate tag="label">-->
        <!--<span>Name *</span>-->
        <!--<input v-model="user.name" required name="name" />-->

        <!--<field-messages name="name">-->
          <!--<div>Success!</div>-->
          <!--<div slot="required">Name is a required field</div>-->
        <!--</field-messages>-->
      <!--</validate>-->

      <div class="container wrapper">
        <CommonHeader/>
        <div class="row">
          <div class="form-horizontal login-form" >

            <validate>
              <div class="form-group">
                <label for="name" class="col-sm-4 control-label">名字</label>
                <div class="col-sm-5" >
                    <input type="text" v-model="user.name" class="form-control" id="name" placeholder="请输入用户名" required name="name" />
                </div>
              </div>
              <field-messages name="name">
                <div slot="required">必须输入名称</div>
              </field-messages>
            </validate>

            <validate>
              <div class="form-group">
                <label for="oldPassword" class="col-sm-4 control-label">旧密码</label>
                <div class="col-sm-5">
                  <input type="password" class="form-control" id="oldPassword" required placeholder="请输入旧密码"  v-model="user.oldPassword" name="oldPassword">
                </div>
              </div>
              <field-messages name="oldPassword">
                <div slot="required">必须输入旧密码</div>
              </field-messages>
            </validate>

            <validate >
              <div class="form-group">
                <label for="newPassword" class="col-sm-4 control-label">新的密码</label>
                <div class="col-sm-5">
                  <input type="password" class="form-control" id="newPassword" required placeholder="请输入新的密码密码"  v-model="user.newPassword" name="newPassword">
                </div>
              </div>
              <field-messages name="newPassword">
                <div slot="required">必须输入新的密码</div>
              </field-messages>
            </validate>

            <validate :custom="{}">
              <div class="form-group">
                <label for="newConfirmPassword" class="col-sm-4 control-label">确认密码</label>
                <div class="col-sm-5">
                  <input type="password" class="form-control" id="newConfirmPassword" required placeholder="请输入确认密码"  v-model="user.newConfirmPassword" name="newConfirmPassword">
                </div>
              </div>
              <field-messages name="newConfirmPassword">
                <div slot="required">必须输入确认密码</div>

                <!--<div v-if="user.newPassword != user.newConfirmPassword">两次输入的密码不一致</div>-->
                <!--<div slot="passwordValidator">两次输入的密码不一致</div>-->

              </field-messages>
            </validate>

            <!--<div class="errors" v-if="myform.$submitted">-->
              <!--<p class="bg-danger text-center" v-if="myform.name.$error.required">请输入用户名.</p>-->
              <!--<p class="bg-danger text-center" v-if="myform.email.$error.email">请输入正确的邮箱.</p>-->
            <!--</div>-->

            <div v-if="errorMsg" class="form-group error">
              <label for="error" class="col-sm-4 control-label">错误</label>
              <div id="error" class="col-sm-5">
                <span>{{ errorMsg }}</span>
              </div>
            </div>

            <Loading v-if="isRequesting" marginTop="30%"></Loading>

            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-5">
                <input :disabled="formstate.$invalid" type="submit" class="btn btn-default" value="找回密码" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </vue-form>
    <!--<pre>{{ formstate }}</pre>-->

    <!-- 忘记密码框 end -->

    <!-- footer start -->
    <CommonFooter></CommonFooter>
    <!-- footer end -->
  </div>
</template>
<style>

</style>
<script>
    import Loading from '@/components/Loading'
    import CommonFooter from '@/components/Footer'
    import CommonHeader from '@/components/Header'
    import axios from 'axios'
    import { RESET_PW_URL } from '@/config'

    export default{
        data(){
            return {
                formstate: {},
                user: {
                  // 用户名
                  name: '',
                  // 原始密码
                  oldPassword: '',
                  // 新设密码
                  newPassword:'',
                  // 确认新设密码
                  newConfirmPassword:'',
                },

                isRequesting: false,
                errorMsg:'',
            }
        },
        watch:{
          '$route':function(){
              // url 跳转进来的时候重置数据
              if(this.$route.name == "forgetPw"){
                console.log("重置forgetpw数据")
                this.formstate = {}
                this.user.name = ''
                this.user.oldPassword = ''
                this.user.newPassword = ''
                this.user.newConfirmPassword = ''
                this.isRequesting = false
                this.errorMsg = ''
              }
          }
        },
        components:{
            Loading,
            CommonFooter,
            CommonHeader
        },
        methods:{

          passwordValidator(value) {
            // 验证两次输入的密码是否一致
            console.log(this.user.newPassword)
            console.log(this.user.newConfirmPassword)
            return this.user.newPassword == this.user.newConfirmPassword;
          },

          // 找回密码逻辑
          resetPw(){
              // 如果表单验证通过, 则发送请求到服务器重置密码
              if(this.user.newPassword != this.user.newConfirmPassword){
                this.errorMsg = "两次输入的密码不一致"
                return
              }

              if(this.formstate.$valid) {
                // 验证通过, axios 发送请求到后台
                  this.isRequesting = true
                  var _that = this

                  // 发送登录请求
                  axios({
                      url: RESET_PW_URL,
                      method: 'post',
                      data: _that.user,
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    }).then(function (response) {

                      console.log(response)
                      // 请求成功
                      if(response.data.success == true){
                        // 修改密码成功
                        console.log("修改密码成功")
                        // 跳转到login
                        _that.$router.push({"name":"login"});
                      }else{
                         _that.errorMsg = response.data.msg
                      }
                      _that.isRequesting = false;
                  })
                  .catch(function (error) {
                    // 请求失败
                    console.log(error);
                    _that.isRequesting = false;
                  });

                return;
              }
          },

        }
    }
</script>
