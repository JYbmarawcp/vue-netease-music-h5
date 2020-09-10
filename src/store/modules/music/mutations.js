
export default {
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setCurrentTime(state, time) {
    state.currentTime = time
  },
  setPlayingState(state, playing) {
    state.playing = playing
  },
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  setPlayerShow(state, show) {
    state.isPlayerShow = show
  },
  setPlaylistShow(state, show) {
    state.isPlaylistShow = show
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist
  }
}