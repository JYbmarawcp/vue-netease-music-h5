/**
 * 业务工具方法
 */

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

export function genArtistsText(artists) {
  return (artists || []).map(({name}) => name).join('/')
}

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}