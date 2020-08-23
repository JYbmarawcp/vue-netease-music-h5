import { request } from '@/utils'

export const getBanner = () => request.get('/banner?type=0')

// 获取推荐歌单
export const getPersonalized = params => 
  request.get('/personalized', { params })