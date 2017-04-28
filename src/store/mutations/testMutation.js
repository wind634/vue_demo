/**
 * Created by wangjiang on 17/4/20.
 */

import { ADD, MIS, INCREMENT_WITH_VALUE, SHOW_WAITING_MESSAGE,HIDE_WAITING_MESSAGE } from  '../constants/types'

export const testMutation = {

  [ADD] (state) {
    state.count++
  },

  [MIS] (state) {
    state.count--
  },

  [INCREMENT_WITH_VALUE](state, value){
    //state.count +=value;
    state.count = state.count + value.intValue + value.anotherValue;
  },
  // 显示和隐藏waiting
  [SHOW_WAITING_MESSAGE](state){
    state.waiting = true;
  },
  [HIDE_WAITING_MESSAGE](state){
    state.waiting = false;
  }
}
