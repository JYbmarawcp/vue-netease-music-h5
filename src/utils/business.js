/**
 * 业务工具方法
 */
import { getAlbum } from "@/api"
import { isDef } from "./common"

export function createSong(song) {
  const {
    id,
    name,
    img,
    artists,
    duration,
    albumId,
    albumName,
    mvId,
    ...rest
  } = song
  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: genSongPlayUrl(id),
    artistsText: genArtistsText(artists),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话 会在songTable组件上加上mv链接
    mvId,
    ...rest
  }
}

export async function getSongImg(id, albumId) {
  if (!isDef(albumId)) {
    throw new Error('need albumId')
  }
  const { songs } = await getAlbum(albumId)
  const {
    al: { picUrl }
  } = songs.find(({ id: songId }) => songId === id) || {}
  return picUrl
}

export function genArtistsText(artists) {
  return (artists || []).map(({name}) => name).join('/')
}

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}