/**
 * Created by wangjiang on 17/4/20.
 */
import { testAction } from '../actions/testAction'
import { testGetter } from '../getters/testGetter'
import { testMutation } from '../mutations/testMutation'

// 创建一个对象来保存应用启动时的初始状态
const state = {
  // TODO: 放置初始状态
  count:100,
  // 新增waiting  状态
  waiting: false,
  // 额外需要增加的数字
  anotherIncrement: 5
}

export const test = {
  state: state,
  actions: testAction,
  getters: testGetter,
  mutations: testMutation
}
