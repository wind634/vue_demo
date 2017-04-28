/**
 * Created by wangjiang on 17/4/20.
 */


import { auth } from './authModule'
import { list } from './listModule'
import { test } from './testModule'


export const modules = {
  auth: auth,
  list: list,
  test: test
}
