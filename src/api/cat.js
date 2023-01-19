import request from '@/service'
import {ref} from "vue";

//cat get
export function get() {
  return request({
    method: 'get',
    url: '/cat/home',
    data: ref({})
  })
}
