import request from '@/service'

//home get
export function get() {
  return request({
    method: 'get',
    url: 'activity/home',
    data: {}
  })
}
export function send(data) {
  return request({
    method: 'post',
    url: 'activity/post',
    data
  })
}
