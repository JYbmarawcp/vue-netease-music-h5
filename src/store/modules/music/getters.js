import { isDef, playModeMap } from "@/utils"

// 当前是否有歌曲在播放
export const hasCurrentSong = (state) => {
  return isDef(state.currentSong.id)
}

export const currentIndex = (state) => {
  const { currentSong, playlist } = state
  return playlist.findIndex(({ id }) => id === currentSong.id)
}

export const nextSong = (state, getters) => {
  const { playlist, playMode } = state
  const nextStartMap = {
    [playModeMap.sequence.code]: getSequenceNextIndex,
    [playModeMap.loop.code]: getLoopNextIndex,
    [playModeMap.random.code]: getRandomNextIndex,
  }
  const getNextStart = nextStartMap[playMode]
  const index = getNextStart()

  return playlist[index]

  // 顺序
  function getSequenceNextIndex() {
    let nextIndex = getters.currentIndex + 1
    if (nextIndex > playlist.length - 1) {
      nextIndex = 0
    }
    return nextIndex
  }
  
  // 单曲
  function getLoopNextIndex() {
    return getters.currentIndex
  }

  // 随机
  function getRandomNextIndex() {
    return getRandomIndex(playlist, getters.currentIndex)
  }
}

// 上一首歌
export const prevSong = (state, getters) => {
  const { playlist, playMode} = state
  const prevStartMap = {
    [playModeMap.sequence.code]: genSequencePrevIndex,
    [playModeMap.loop.code]: getLoopPrevIndex,
    [playModeMap.random.code]: getRandomPrevIndex,
  }
  const getPrevStart = prevStartMap[playMode]
  const index = getPrevStart()

  return playlist[index]

  function genSequencePrevIndex() {
    let prevIndex = getters.currentIndex -1
    if (prevIndex < 0) {
      prevIndex = playlist.length -1
    }
    return prevIndex
  }

  function getLoopPrevIndex() {
    return getters.currentIndex
  }

  function getRandomPrevIndex() {
    return getRandomIndex(playlist, getters.currentIndex)
  }
}

function getRandomIndex(playlist, currentIndex) {
  // 防止无限循环
  if (playlist.length === 1) {
    return currentIndex
  }
  let index = Math.round(Math.random() * playlist.length - 1)
  if (index === currentIndex) {
    index = getRandomIndex(playlist, currentIndex)
  }
  return index
}