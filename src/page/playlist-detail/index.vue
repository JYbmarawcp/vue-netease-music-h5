<template>
  <div class="playlist-detail">
    <Scroll v-if="songs.length">
      <DetailHeader :playlist="playlist" />
      <SongList class="song-list" :songs="songs" />
    </Scroll>
  </div>
</template>

<script>
import { getListDetail, getSongDetail } from "@/api"
import { createSong } from "@/utils"
import DetailHeader from "./header"
import SongList from "@/components/song-list"

const MAX = 500
export default {
  props: ["id"],
  data () {
    return {
      playlist: {},
      songs: [],
    }
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
      this.genSonglist(playlist)
    },
    async genSonglist(playlist) {
      const trackIds = playlist.trackIds.map(({id}) => id)
      const songDetails = await getSongDetail(trackIds.slice(0, MAX))
      const songs = songDetails.songs.map(({id, name, al, ar, mv, dt }) =>
        createSong({
          id,
          name,
          artists: ar,
          albumName: al.name,
          img: al.picUrl,
          mvId: mv,
          duration: dt,
        })
      )
      this.songs = songs
    }
  },
  watch: {
    id: {
      handler() {
        this.init()
      },
      immediate: true
    }
  },
  components: {
    DetailHeader,
    SongList
  }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #f8f8f8;

  .song-list {
    margin-top: -40px;
    position: relative;
    z-index: 2;
  }
}
</style>