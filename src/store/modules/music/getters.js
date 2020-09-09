import { isDef } from "@/utils"

// 当前是否有歌曲在播放
export const hasCurrentSong = (state) => {
  return isDef(state.currentSong.id)
}