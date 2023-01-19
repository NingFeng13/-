import request from '@/service'

//管理员登录的post接口
export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}
export function enroll(data) {
  return request({
    url: 'user/register',
    method: 'post',
    data
  })
}