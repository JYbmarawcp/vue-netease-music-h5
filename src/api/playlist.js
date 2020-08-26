import { request } from '@/utils'

// 获取歌单
export const getListDetail = params => 
  request.get('/playlist/detail', { params })
