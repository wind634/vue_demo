/**
 * Created by wangjiang on 17/4/20.
 */


import { UPDATE_USER_INFO } from  '../constants/types'
import axios from 'axios'

export const authAction = {
  increment({commit}) {
    commit("UPDATE_USER_INFO");
  }
}
