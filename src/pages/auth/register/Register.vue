<template>
  <div class="register">
    <h2> 用户注册 </h2>
    <!-- 注册框 start -->
    <form @submit.prevent="register">
      <div class="container wrapper">
        <CommonHeader />
        <div class="row">
          <div class="form-horizontal login-form" >
            <div class="form-group">
              <label for="company" class="col-sm-4 control-label">公司名</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" id="company" placeholder="请输入公司名称" v-model="company">
              </div>
            </div>
            <div class="form-group">
              <label for="name" class="col-sm-4 control-label">名字</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" id="name" placeholder="请输入用户名"  v-model="name">
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-sm-4 control-label">密码</label>
              <div class="col-sm-5">
                <input type="password" class="form-control" id="password" placeholder="请输入密码"  v-model="password">
              </div>
            </div>

            <div class="form-group">
              <label for="sndPassword" class="col-sm-4 control-label">确认密码</label>
              <div class="col-sm-5">
                <input type="password" class="form-control" id="sndPassword" placeholder="请确认密码"  v-model="sndPassword">
              </div>
            </div>

            <div v-if="errorMsg" class="form-group error">
              <label for="password" class="col-sm-4 control-label">错误</label>
              <div class="col-sm-6">
                <span>{{errorMsg}}</span>
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-5">
                <input type="submit" class="btn btn-default" value="注册" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!--<Loading v-if="isLoging" marginTop="30%"></Loading>-->
    <!-- 注册框 end -->

    <!-- footer start -->
    <CommonFooter></CommonFooter>
    <!-- footer end -->
  </div>
</template>
<style>
    body{

    }
</style>
<script>
    import Loading from '@/components/Loading'
    import CommonFooter from '@/components/Footer'
    import CommonHeader from '@/components/Header'
    import axios from 'axios'
    import { REGISTER_URL } from '@/config'


    export default{
        data(){
            return{
                isLoging: false,
                // 公司名称
                company: '',
                // 用户名称
                name: '',
                // 密码
                password: '',
                // 确认密码
                sndPassword:'',

                errorMsg:'',
            }
        },
        components:{
            Loading,
            CommonFooter,
            CommonHeader,
        },
        methods:{
          // 注册逻辑
          register(event){
            //
            var formData = new FormData(event.target);

            console.log(formData)
            // 发送请求进行注册

              /*
              if($.trim(this.company)!='' && $.trim(this.name)!='' && this.password!=''){
                // this.toLogin()
              }else{
                console.log("用户名或密码或公司名称不能为空")
                this.errorMsg = "用户名或密码或公司名称不能为空"
              }
              */
          },
        }
    }
</script>
