<template>
  <div id="app">
    <!--公用app.vue组件-->
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>

    <!--<keep-alive>-->
      <!--<router-view transition transition-mode="out-in"></router-view>-->
    <!--</keep-alive>-->
  </div>
</template>

<script>
import axios from 'axios'
import { GET_USER_INFO_URL } from '@/config'

export default {
  name: 'app',
  data () {
    return {

    }
  },

  mounted(){
    //组件开始挂载时获取用户信息
    this.getUserInfo();
  },

  methods: {
    //请求用户的一些信息
    getUserInfo(){
      console.log("发送http请求获取用户信息....")
      var _that = this
      //发送http请求获取用户信息
      axios({
        url: GET_USER_INFO_URL,
        method: 'get',
        data: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        var userInfo = response.data.user
        //提交mutation到Store
        _that.$store.commit('UPDATE_USER_INFO', userInfo)

        /*
          进行权限判断,
          从$store中拿出userinfo.roles 获取用户角色
          根据用户的角色来控制routes的显示隐藏
          一个角色对应多个url name
          如果routes route name相匹配, 则把hidden设置为true
          _that.$router.options.routes[6].hidden=true
        */

      }).catch(function (error) {
        // 请求失败
        console.log(error);
        // 如果返回的状态码是401, 说明cookie失效或则session过期, 则跳转到登录界面
        if(error.response && error.response.status=="401"){
          // 如果请求状态码是401, 则跳回登录界面
          if(_that.$router.currentRoute.meta.requireAuth===true){
            _that.delCookie('session');
            _that.$router.push('/login/');
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" >
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
