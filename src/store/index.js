/**
 * Created by wangjiang on 17/4/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {modules}  from './modules'


Vue.use(Vuex)

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  modules: {
    auth: modules.auth,
    list: modules.list,
    test: modules.test
  }
//  strict: process.env.NODE_ENV !== 'production'
})



