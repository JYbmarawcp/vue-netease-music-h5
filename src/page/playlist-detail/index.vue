<template>
  <transition name="slide">
    <div class="playlist-detail">
      <div class="plhead_bg" ref="plheadBg" :style="getbg"></div>
      <div class="list-fixed">
        <Icon @click.native="back" class="back" type="back" color="white" />
        <p class="fixed-title">歌单</p>
        <Icon
          @click.native="showPlaylist"
          class="back"
          type="pinglun"
          color="white"
        />
      </div>
      <Scroll
        class="scrollHeight"
        v-if="songs.length"
        :options="{ probeType: 3 }"
        @scroll="scroll"
        ref="scroller"
      >
        <DetailHeader
          :playlist="playlist"
          @show="showComment"
          @showPlaylist="showPlaylist"
        />
        <SongList v-show="!commentShow" class="song-list" :songs="songs" />
        <Comments
          class="comment-list"
          v-show="commentShow"
          :id="Number(id)"
          type="playlist"
          @load="loadImg"
        />
      </Scroll>
    </div>
  </transition>
</template>

<script>
import { getListDetail, getSongDetail } from '@/api'
import { createSong } from '@/utils'
import DetailHeader from './header'
import SongList from '@/components/song-list'
import Comments from '@/components/comments'

const MAX = 500
export default {
  props: ['id'],
  data() {
    return {
      playlist: {},
      songs: [],
      commentShow: false,
      scrollY: 0,
    }
  },
  methods: {
    showPlaylist() {
      this.commentShow = !this.commentShow
      setTimeout(() => {
        this.$refs.scroller.refresh()
      }, 30)
    },
    loadImg() {
      this.$refs.scroller.refresh()
    },
    showComment() {
      this.commentShow = !this.commentShow
      setTimeout(() => {
        this.$refs.scroller.refresh()
      }, 30)
    },
    async init() {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
      this.genSonglist(playlist)
    },
    async genSonglist(playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id)
      const songDetails = await getSongDetail(trackIds.slice(0, MAX))
      const songs = songDetails.songs.map(({ id, name, al, ar, mv, dt }) =>
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
    },
    scroll(y) {
      this.scrollY = y
    },
  },
  computed: {
    getbg() {
      return {
        'background-image': `url(${this.playlist.coverImgUrl}?param=170y170)`,
      }
    },
  },
  watch: {
    id: {
      handler() {
        this.init()
      },
      immediate: true,
    },
    scrollY(newVal) {
      if (newVal > 0) {
        this.$refs.plheadBg.style.bottom = `${58 - newVal / 6}%`
      }
    },
  },
  components: {
    DetailHeader,
    SongList,
    Comments,
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
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
      content: ' ';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.25);
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

  .scrollHeight {
    height: calc(100% - 40px);
    position: relative;
    .song-list {
      display: inline-block;
      position: relative;
      z-index: 2;
      width: 100%;
    }
    .comment-list {
      border-radius: 20px 20px 0 0;
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
