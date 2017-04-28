// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import { loginUtil } from "@/utils/loginUtil"
import axios from 'axios'
import VueForm from 'vue-form';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/element-#ff694c/index.css'
import 'font-awesome/css/font-awesome.min.css'

// install globally
Vue.use(VueForm)
Vue.use(ElementUI)

axios.defaults.withCredentials = true

Vue.config.productionTip = false


//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  // 观察路由变化
  watch:{
     //"$route" : 'checkLogin'
  },
  template: '<App/>',
  components: { App },
  created() {
     this._checkLogin()
  },
  methods:{
    _checkLogin(){
        // 判断用户有没有登录
      var is_login = loginUtil.checkLogin()
      if (is_login){
        // 已登录
        console.log("用户已登录,跳转到首页界面")
        //this.$router.push('/');
      }else{
        // 未登录, 用户未登录, 要判断是否是
        if(this.$router.currentRoute.meta.requireAuth===true){
          console.log("用户未登录,跳转到登录界面...")
          this.$router.push('/login')
        }
      }

    }
  }
})
