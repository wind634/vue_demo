import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/auth/login/Login'
import Register from '../pages/auth/register/Register'
import ForgetPw from '../pages/auth/forgetpw/ForgetPw'
import NotFound from '../pages/error/404'

import Base from '../pages/admin/base/Base'
import Main from '../pages/admin/main/Main'
import User from '../pages/admin/user/User'

import { loginUtil } from "@/utils/loginUtil"

Vue.use(Router)

const router = new Router({
  routes: [
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: Login,
      hidden: true
    },
    // 404页面
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },

    // 注册
    {
      path: '/register',
      name: 'register',
      component: Register,
      hidden: true
    },

    // 忘记密码
    {
      path: '/forgetPw',
      name: 'forgetPw',
      component: ForgetPw,
      hidden: true
    },

    // 进入后台
    {
      path:'/',
      redirect:{name:'main'},
      hidden: true
    },

    {
      path: '/',
      name: 'home',
      iconCls: 'el-icon-message',//图标样式class
      component: Base,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        aliasName:'首页'
      },
      children:[
          {
            path: '/admin/home/bar1',
            component: Main,
            name: 'main',
            meta: {
              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              aliasName:'子栏目一'
            },
          },
          {
            path: '/admin/home/bar2',
            component: Main,
            name: 'home_bar2',
            meta: {
              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              aliasName:'子栏目二'
            },
          },
          {
            path: '/admin/home/bar3',
            component: Main,
            name: 'home_bar3',
            meta: {
              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              aliasName:'子栏目三'
            },
          },
          {
            path: '/admin/home/bar4',
            component: Main,
            name: 'home_bar4',
            meta: {
              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              aliasName:'子栏目四'
            },
          },
      ]
    },

    {
      path: '/',
      name: 'users',
      iconCls: 'fa fa-address-card',//图标样式class
      component: Base,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        aliasName:'用户管理'
      },
      children:[
        {
          path: '/admin/users/bar1',
          component: User,
          name: 'users_bar1',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            aliasName:'用户列表'
          },
        },
      ]
    },

    {
      path: '/',
      name: 'orders',
      iconCls: 'fa fa-id-card-o',//图标样式class
      component: Base,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        aliasName:'订单管理'
      },
      children:[
        {
          path: '/admin/orders/bar1',
          component: Main,
          name: 'orders_bar1',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            aliasName:'订单列表'
          },
        },
        {
          path: '/admin/orders/bar2',
          component: Main,
          name: 'orders_bar2',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            aliasName:'订单配置'
          },
        },
      ]
    },

    {
      path: '/',
      component: Base,
      name: '',
      iconCls: 'el-icon-picture',
      leaf: true,//只有一个节点
      children: [
        {
          path: '/admin/charts/bar1',
          component: Main,
          name: 'charts_bar1',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            aliasName:'图表一'
          }
        }
      ]
    },

    {
      path: '/',
      name: 'settings',
      iconCls: 'el-icon-star-on',//图标样式class
      component: Base,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        aliasName:'系统配置'
      },
      children:[
        {
          path: '/admin/settings/bar1',
          component: Main,
          name: 'settings_bar1',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            aliasName:'配置一'
          },
        },
        {
          path: '/admin/settings/bar2',
          component: Main,
          name: 'settings_bar2',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            aliasName:'配置二'
          },
        },
        {
          path: '/admin/bar3',
          component: Main,
          name: 'settings_bar3',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            aliasName:'配置三'
          },
        }
      ]
    },
    // 404错误页面
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ],

  // TODO 路径是否带# 可能会导致静态资源路径有问题
  //mode: 'history',
})

// 路由的全局钩子
router.beforeEach((to, from, next) => {
  //next()
  ///*
    // 判断是否是几个不需要用户登录的路径
    var requireAuth = to.meta.requireAuth
    if(requireAuth === true){
      // 如果需要用户登录, 则判断是否已经登录
      var is_login = loginUtil.checkLogin()
      if(is_login){
        // 登录了则继续往下走
        //console.log("登录了则继续往下走")
        next()
      }else{
        // 未登录跳转到登录界面
        next("/login")
      }
    }else{
      console.log("不需要验证是否登录")
      next()
    }
   //*/
})


export default router


