/**
 * Created by wangjiang on 17/4/20.
 */


/**
 * Created by wangjiang on 17/4/20.
 */


import { ADD, MIS } from  '../constants/types'

export const testAction = {
    increment({commit}) {
      commit("ADD");
    },
    decrement({commit}) {
      commit("MIS");
    },
    incrementWithValue({commit}, value){
      let intValue = parseInt(value);
      if(isNaN(intValue)){
        throw "Not an Interger"
      }else {
        commit("INCREMENT_WITH_VALUE", parseInt(value))
      }
    },

    incrementWithValue2({commit}, value){
      commit("SHOW_WAITING_MESSAGE");
      let intValue = parseInt(value)
      setTimeout(function() {
        if(isNaN(intValue)) {
          alert("Not an Interger")
        }else {
          commit("HIDE_WAITING_MESSAGE");
          commit("INCREMENT_WITH_VALUE", intValue)
        }
      }, 2000)
    },

  incrementWithValue3({commit}, value){
    commit("SHOW_WAITING_MESSAGE")
    let intValue = parseInt(value.value)
    let anotherValue = value.anotherValue
    setTimeout(function() {

      if(isNaN(intValue)) {
        alert("Not an Interger")
      }else {
        commit("HIDE_WAITING_MESSAGE");
        commit("INCREMENT_WITH_VALUE", {intValue, anotherValue})
      }
    }, 2000)
  }

}
