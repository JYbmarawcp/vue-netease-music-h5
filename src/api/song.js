import { request } from "@/utils"

// 获取音乐详情
export const getSongDetail = ids =>
  request.get(`/song/detail?ids=${ids}`)

// 歌词
