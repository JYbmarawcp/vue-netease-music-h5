import { request } from '@/utils'

// 获取歌单
export const getListDetail = params => 
  request.get('/playlist/detail', { params })

// 获取排行榜
export const getToplist = () => request.get('/toplist/detail')
