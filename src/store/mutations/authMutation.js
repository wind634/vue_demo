/**
 * Created by wangjiang on 17/4/20.
 */

import { UPDATE_USER_INFO } from  '../constants/types'

export const authMutation = {

  [UPDATE_USER_INFO](state, newUserInfo) {
    console.log("从服务器上更新用户的相关信息")
    state.userInfo = newUserInfo;
  }

}
