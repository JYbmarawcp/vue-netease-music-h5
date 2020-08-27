<template>
  <transition name="slide">
    <div class="playlist-detail">
      <div class="plhead_bg" :style="getbg"></div>
      <div class="list-fixed">
        <Icon
          @click.native="back"
          class="back" 
          type="back" 
          color="white" 
        />
        <p class="fixed-title">歌单</p>
        <Icon class="back" type="pinglun" color="white" />
      </div>
      <Scroll v-if="songs.length">
        <DetailHeader :playlist="playlist" />
        <Slider
          :options="{ slide: {loop: false,threshold: 100}, bounce: true }"
          :autoPlay="false"
          :showDoc="false"
        >
          <SongList class="song-list" :songs="songs" />
          <Comment />
        </Slider>
      </Scroll>
    </div>
  </transition>
</template>

<script>
import { getListDetail, getSongDetail } from "@/api"
import { createSong } from "@/utils"
import DetailHeader from "./header"
import SongList from "@/components/song-list"
import Comment from "./comment"

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
    },
    back() {
      this.$router.back()
    }
  },
  computed: {
    getbg() {
      return {'background-image':`url(${this.playlist.coverImgUrl}?param=170y170)` }
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
    SongList,
    Comment
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0)
}
.playlist-detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #f8f8f8;
  overflow: hidden;

  .plhead_bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 58%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    transform: scale(1.5);
    z-index: -1;
    filter: blur(19px);

    &::after {
      content: " ";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.25);
    }
  }
  .list-fixed {
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;

    .back {
      padding: 10px 8px;
      width: 40px;
    }
    .fixed-title {
      color: $white;
      flex: 1;
      line-height: 40px;
      text-align: center;
    }
  }

  .song-list {
    display: inline-block;
    margin-top: -40px;
    position: relative;
    z-index: 2;
    width: 100%;
  }
}
</style>