import { request } from '@/utils'

// 获取推荐歌单
export const getPersonalized = params => 
  request.get('/personalized', { params })