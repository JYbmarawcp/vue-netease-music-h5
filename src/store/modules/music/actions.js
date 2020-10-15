import { getSongImg } from "@/utils"

// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
// 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
// 实践中，我们会经常用到 ES2015 的 参数解构 来简化代码
export default {
  // 整合歌曲信息 并开始播放
  async startSong({ commit }, rawSong) {
    // 浅拷贝一份 改变引用
    // 1.不 污染元数据
    // 2. 单曲循环为了触发watch
    const song = Object.assign({}, rawSong)
    if (!song.img) {
      if (song.albumId) {
        song.img = await getSongImg(song.id, song.albumId)
      }
    }
    commit('setCurrentSong', song)
    commit('setPlayingState', true)
    
  }
}