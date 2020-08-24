import { request } from '@/utils'

export const getSinger = () => 
  request.post('/login/cellphone?phone=18767183600&password=fujiahang1122')

export const getSong = cookie => 
  request.get(`/user/event?uid=50868949&cookie=${cookie}`)