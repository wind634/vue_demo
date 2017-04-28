/**
 * Created by wangjiang on 17/4/20.
 */

import { authAction } from '../actions/authAction'
import { authGetter } from '../getters/authGetter'
import { authMutation } from '../mutations/authMutation'

// 创建一个对象来保存应用启动时的初始状态
const state = {
  // TODO: 放置初始状态
  //保存用户信息
  userInfo: {

  }
}

export const auth = {
  state: state,
  actions: authAction,
  getters: authGetter,
  mutations: authMutation
}
