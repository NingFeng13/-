import request from '@/service'
import {useStore} from 'vuex'

//home get
export function getCat() {
  const store = useStore()
  const id = store.state.catId
  return request({
    method: 'get',
    url: 'cat/detail?catId=' + id,
    data: {}
  })
}
export function getCategory(){
  return request({
    method: 'get',
    url: 'meal/get/category',
    data: {}
  })
}
export function getBrand(){
  return request({
    method: 'get',
    url: 'meal/get/brand',
    data: {}
  })
}
export function postMeal(data){
  return request({
    method: 'post',
    url: 'meal/post',
    data
  })
}
export function getMeal(){
  const store = useStore()
  const id = store.state.catId
  return request({
    method: 'get',
    url: 'meal/record?id=' + id,
    data: {}
  })
}