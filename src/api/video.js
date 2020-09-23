import { request } from '@/utils'

export const getSinger = () =>
  request.post('/login/cellphone?phone=18767183600&password=fujiahang1122')

export const getVideoTab = cookie =>
  request.get(`/video/group/list?cookie=${cookie}`)
// request.get(`/user/event?uid=50868949&cookie=${cookie}`)

export const getVideo = cookie =>
  request.get(`/video/group?id=9104&cookie=${cookie}`)

export const getVideoRecommend = cookie =>
  request.get(`/video/timeline/recommend?cookie=${cookie}`)
