/**
 * Created by wangjiang on 17/4/20.
 */


import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE } from  '../constants/types'
import axios from 'axios'

export const fetchListAction = {
  fetchList ({ commit, state }, param) {
    commit(FETCH_LIST_REQUEST)
    axios.get('http://youdomain.com/list')
      .then(function (response) {
        commit(FETCH_LIST_SUCCESS, {
          //request: param['request']
          data: response.data
        })
        console.log(response);
      })
      .catch(function (error) {
        commit(FETCH_LIST_FAILURE, {
          //request: param['request']
          error: error
        })
        console.log(error);
      });
  }
}
