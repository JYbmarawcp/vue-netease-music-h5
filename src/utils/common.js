export function genImgUrl (url, w, h) {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}