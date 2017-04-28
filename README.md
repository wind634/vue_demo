# sale_portal

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


前端工程大致技术
bootstrap jquery vue vue-router webpack
index.html 是 首页 公用模板
要用上vuex来进行状态管理

vuex

mounted () {
        this.fetchList({
            request: 'week'
        })
    },
    methods: {
        ...mapActions([
            'fetchList'
        ])
    },
    computed: {
        ...mapState{
            list: state => state.list
        },
        ...mapGetter{[
            'hotList'
        ]}
    }

下午主要任务:
  编写注册登录的页面及业务逻辑

  axios post进行登录  跨域问题解决 完成

  登录成功后执行的操作:
  1. 登录成功将相关用户信息保存到本地
  2. setcookie能够保存下cookie信息
  3. 跳转到登录成功界面

  服务器端要有判断用户是否登录的api  完成

  从服务器端获取用户的相关信息接口  完成

  跳转到 忘记密码和注册 完成

  有几个要点逻辑:
  1.router发生变动的时候要判断是否已经登录, 有些url是未登录的时候也能访问
  比如忘记密码, 注册, 有的url必须登录之后才能访问, 所以还是要获取是否登录
  状态才能够判别
  此问题已用路由全局钩子解决

  2.跨域登录cookie设置还是有问题  目前可以跨域登录了

  3.获取用户信息的逻辑是否可以和跨域登录cookie设置还是有问题判断登录的逻辑重合
    这里要确定如何存储用户的登录信息

  4.是否考虑用cookie来存储部分的用户信息
    // 目前不使用cookie来存储, 后期再考虑 或者存name+sha256(pw)
    使用cookie来判断用户是否登录

  axios同步异步问题 axios是个异步请求库, 要用异步的逻辑去考虑
  退出逻辑完成

  5. 客户端cookie过期了怎么办
  这几个逻辑理清这一块就差不多了

===== 4月24日 =====
1.用户一登录,就在客户端存一cookie,表明该用户已经登录, 退出则删除cookie
2.cookie的设置时间应该略小于session的存活时间,不然会存在cookie存活但是session失效的情况
3.如果需要保存登录状态功能? 记住密码?功能
4. cookie过期怎么办
5. 可能存在cookie的键session和flask的键session冲突的情况,要部到服务器再看看
6. meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
   可使用meta属性对全局路由钩子进行改进

======

vue表单验证有无方便的插件 vue-form 完成
vue-router 重载的时候数据不刷新 可以检测$router变化
vue如何做权限设置?





