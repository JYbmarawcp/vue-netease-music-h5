export function genImgUrl (url, w, h) {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}

export function formatNumber(number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}