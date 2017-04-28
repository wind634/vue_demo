/**
 * Created by wangjiang on 17/4/21.
 */

// config.js
// 项目相关配置

// 服务器地址
export const SERVER_HOST = 'http://127.0.0.1'
// 服务器端口
export const SERVER_PORT = 5050

// 登录url
export const LOGIN_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/login"

// 查看是否登录url
export const IS_LOGIN_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/is_login"

// 获得用户信息url
export const GET_USER_INFO_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/get_user_info"

// 退出登录url
export const LOGOUT_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/logout"

// 注册url
export const REGISTER_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/register"

// 重设密码url
export const RESET_PW_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/resetPw"

// 获得所有用户url
export const GET_USERS_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/getusers"

// 编辑用户url
export const MODIFY_USERS_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/modify"

// 删除用户url
export const DELETE_USERS_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/delete"

// 批量删除用户url
export const PATCH_DELETE_USERS_URL = SERVER_HOST + ':' + SERVER_PORT + "/auth/api/patch_delete"

// 客户端保存cookie的时间 天数
export const SAVE_COOKIE_TIME = 1000 * 60 * 60 * 24 * 15


