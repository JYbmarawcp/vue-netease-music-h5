import { requestWithoutLoading } from "@/utils"

export const getSongComment = params =>
  requestWithoutLoading.get('/comment/music', { params })

export const getPlaylistComment = params =>
  requestWithoutLoading.get('/comment/playlist', { params })

export const getHotComment = params =>
  requestWithoutLoading.get('/comment/hot', { params })

export const getMvComment = params =>
  requestWithoutLoading.get('/comment/mv', { params })
