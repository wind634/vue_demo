/**
 * Created by wangjiang on 17/4/21.
 */
import axios from 'axios'
import { IS_LOGIN_URL } from '@/config'
import Vue from 'vue'

export const loginUtil={
  checkLogin(){
    console.log("检查用户是否处于登录状态...")
    var is_login = false

    /*
    // 备用方案 向服务器发送请求判断是否处于登录状态
    axios({
      url: IS_LOGIN_URL,
      method: 'post',
      data: {},
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data)
      if (response.data.success === true) {
        // 已经登录
        is_login = true
        console.log("已登录")
      } else {
        // 未登录
        is_login = false
        console.log("未登录")
      }
    }).catch(function (error) {
      // 请求失败
      is_login = false
      console.log("未登录")
      console.log(error);
    });

    return is_login
    */

     //检查是否存在session
     if(!Vue.prototype.getCookie('session')){
       console.log("未登录")
       is_login = false
     }else{
       console.log("已登录")
       is_login = true
     }
     return is_login
  }
}
