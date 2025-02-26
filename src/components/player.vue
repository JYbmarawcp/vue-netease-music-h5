<template>
  <div 
    class="player" 
    v-if="hasCurrentSong"
  >
    <transition name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="isPlayerShow">
        <div class="background">
          <img width="100%" height="100%" v-lazy="currentSong.img">
        </div>
        <div class="top">
          <Icon
            @click.native="back"
            class="back"
            type="back"
            :size="18"
            color="white"
          />
          <p class="song-name" v-html="currentSong.name"></p>
          <p class="song-singer" v-html="currentSong.artistsText"></p>
        </div>
        <div class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend.prevent="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <img :class="{playing}" class="play-bar" src="@/assets/needle.png">
            <div class="cd-wrap" ref="cdWrap">
              <div class="cd" :class="cdCls">
                <img class="play-disc" src="@/assets/play-disc.png" alt="">
                <img class="image" :src="$utils.genImgUrl(currentSong.img, 200)">
              </div>
            </div>
          </div>

          <div
            ref="lyricLists" 
            class="middle-r"
          >
            <Scroll
              ref="lyricContent"
              v-if="!nolyric"
              :data="lyric"
              :options="{ probeType: 3 }"
              class=""
              @init="onInitScroller"
            >
              <div
                :class="getActiveCls(index)"
                v-for="(l, index) in lyricWithTranslation"
                :key="index"
                ref="lyric"
                class="lyric-item"
              >
                <p
                  class="lyric-text"
                  v-for="(content, contentIndex) in l.contents"
                  :key="contentIndex"
                >
                  {{ content }}
                </p>
              </div>
            </Scroll>
          </div>
          
        </div>

        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">
              {{ $utils.formatTime(currentTime) }}
            </span>
            <div class="progress-bar-wrapper">
              <ProgressBar
                :percent="playedPercent"
                @percentChange="onProgressBarChange"
              />
            </div>
            <span class="time time-r">
              {{ $utils.formatTime(currentSong.durationSecond) }}
            </span>
          </div>
          <div class="operators">
            <Icon
              @click.native="onChangePlayMode"
              :type="modeIcon"
              :size="24"
              class="icon mode-icon"
            />
            <Icon
              @click.native="prev"
              type="shangyishoushangyige"
              :size="20"
              class="icon"
            />
            <Icon
              @click.native="togglePlaying"
              :type="playIcon"
              :size="40"
              class="icon"
            />
            <Icon
              @click.native="next"
              type="xiayigexiayishou"
              :size="20"
              class="icon"
            />
            <Icon
              @click.native="togglePlaylistShow"
              type="playlist"
              :size="24"
              class="icon"
            />
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!isPlayerShow" @click="open">
        <ProgressCircle :radius="radius" :percent="playedPercent">
          <img :class="cdCls" width="26" height="26" 
            :src="$utils.genImgUrl(currentSong.img, 30)">
        </ProgressCircle>
      </div>
    </transition>
    <NowPlaylist ref="nowPlaylist" />
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="ready"
      @ended="end"
      @timeupdate="updateTime"
      @error="urlError"
    ></audio>
  </div>
</template>

<script>
import animations from 'create-keyframe-animation'
import { getLyric } from "@/api"
import { isDef, playModeMap, prefixStyle } from "@/utils"
import lyricParser from "@/utils/lrcparse"
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
} from '@/store/helper/music'
import NowPlaylist from "@/components/now-playlist"

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
const SCROLL_TYPE = 'scroll'
// 恢复自动滚动的定时器时间
const AUTO_SCROLL_RECOVER_TIME = 1000
export default {
  created () {
    this.touch = {}
    this.lyricScrolling = {
      [SCROLL_TYPE]: false,
    }
    this.lyricTimer = {
      [SCROLL_TYPE]: null,
    }
  },
  data () {
    return {
      radius: 34,
      songReady: false,
      currentShow: 'cd',
      lyric: [],
      tlyric: [],
      nolyric: false,
    }
  },
  methods: {
    back() {
      this.setPlayerShow(false)
    },
    open() {
      this.setPlayerShow(true)
      this.$nextTick(() => {
        this.$refs.lyricContent.refresh()
      })
    },
    // 动画播放效果
    enter(el, done) {
      const {x, y, scale} = this._getPosAndScale
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrap, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrap.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrap.style.transition = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale
      this.$refs.cdWrap.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrap.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrap.style.transition = ''
      this.$refs.cdWrap.style[transform] = ''
    },
    togglePlaying() {
      if (!this.hasCurrentSong) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    async play() {
      if (this.songReady) {
        try {
          await this.audio.play()
        } catch (error) {
          this.setPlayingState(false)
        }
      }
    },
    pause() {
      this.audio.pause()
    },
    prev() {
      if (this.songReady) {
        this.startSong(this.prevSong)
      }
    },
    next() {
      if (this.songReady) {
        this.startSong(this.nextSong)
      }
    },
    ready() {
      this.songReady = true
    },
    end() {
      this.next()
    },
    urlError() {
      this.startSong(this.nextSong)
    },
    updateTime(e) {
      const time = e.target.currentTime
      this.setCurrentTime(time)
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.durationSecond * percent
      this.audio.currentTime = currentTime
      this.setPlayingState(true)
    },
    onChangePlayMode() {
      // 返回可枚举属性的数组
      const modeKeys = Object.keys(playModeMap)
      const currentModeIndex = modeKeys.findIndex(
        (key) => playModeMap[key].code === this.playMode
      )
      const nextIndex = (currentModeIndex + 1) % modeKeys.length
      const nextModeKey = modeKeys[nextIndex]
      const nextMode = playModeMap[nextModeKey]
      this.setPlayMode(nextMode.code)
    },
    togglePlaylistShow() {
      this.$refs.nowPlaylist.show()
    },
    middleTouchStart(e) {
      this.touch.initiated = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(
        0, Math.max(-window.innerWidth, left + deltaX)
      )
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricLists.style[transform] = `transform3d(${offsetWidth}px, 0, 0)`
      this.$refs.lyricLists.style[transitionDuration] = 0
      this.$refs.lyricLists.style.opacity = this.touch.percent
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd() {
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricLists.style[transform] = `transform3d(${offsetWidth}px, 0, 0)`
      this.$refs.lyricLists.style[transitionDuration] = `${time}ms`
      this.$refs.lyricLists.style.opacity = 1 - opacity
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
      this.touch.initiated = false
    },
    async updateLyric() {
      const result = await getLyric(this.currentSong.id)
      this.nolyric = !isDef(result.lrc) || !result.lrc.lyric
      if (!this.nolyric) {
        const { lyric, tlyric } = lyricParser(result)
        this.lyric = lyric
        this.tlyric = tlyric
      }
    },
    getActiveCls(index) {
      return this.activeLyricIndex === index ? 'active' : ''
    },
    onInitScroller(scroller) {
      const onScrollStart = (type) => {
        this.clearTimer(type)
        this.lyricScrolling[type]
      }
      const onScrollEnd = (type) => {
        // 滚动结束后两秒 歌词开始自动滚动
        this.clearTimer(type)
        this.lyricTimer[type] = setTimeout(() => {
          this.lyricScrolling[type] = false
        }, AUTO_SCROLL_RECOVER_TIME)
      }
      scroller.on('scrollStart', onScrollStart.bind(null, SCROLL_TYPE))
      scroller.on('scrollEnd', onScrollEnd.bind(null, SCROLL_TYPE))
    },
    clearTimer(type) {
      this.lyricTimer[type] && clearTimeout(this.lyricTimer[type])
    },
    scrollToActiveLyric() {
      if (this.activeLyricIndex !== -1) {
        const { lyricContent, lyric } =  this.$refs
        if (lyric && lyric[this.activeLyricIndex]) {
          lyricContent
            .getScroll()
            .scrollToElement(lyric[this.activeLyricIndex], 200, 0, true)
        }
      }
    },
    ...mapMutations([
      "setPlayerShow",
      "setPlayMode",
      "setPlayingState",
      "setCurrentTime",
    ]),
    ...mapActions(["startSong"])
  },
  computed: {
    _getPosAndScale() {
      const targetWidth = 26
      const paddingRight = 21
      const paddingTop = 20
      const Top = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = window.innerWidth / 2 - paddingRight
      const y = -(width / 2 + Top - paddingTop)
      return {
        x,
        y,
        scale
      }
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    currentMode() {
      return playModeMap[this.playMode]
    },
    modeIcon() {
      return this.currentMode.icon
    },
    playIcon() {
      return this.playing ? 'zanting' : 'playing'
    },
    audio() {
      return this.$refs.audio
    },
    // 播放进度百分比
    playedPercent() {
      const { durationSecond } = this.currentSong
      return Math.min(this.currentTime / durationSecond, 1) || 0
    },
    activeLyricIndex() {
      return this.lyricWithTranslation
        ? this.lyricWithTranslation.findIndex((l, index) => {
            const nextLyric = this.lyricWithTranslation[index + 1]
            return (
              this.currentTime >= l.time &&
              (nextLyric ? this.currentTime < nextLyric.time : true)
            )
          })
        : -1
    },
    lyricWithTranslation() {
      let ret = []
      // 空内容的去除
      const lyricFiltered = this.lyric.filter(({ content }) => Boolean(content))
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach((l) => {
          const { time, content } = l
          const lyricItem = { time, content, contents: [content] }
          const sameTimeTLyric = this.tlyric.find(
            ({ time: tLyricTime }) => tLyricTime === time
          )
          if (sameTimeTLyric) {
            const { content: tLyricContent } = sameTimeTLyric
            if (content) {
              lyricItem.contents.push(tLyricContent)
            }
          }
          ret.push(lyricItem)
        })
      } else {
        ret = lyricFiltered.map(({ time, content }) => ({
          time,
          content,
          contents: [content],
        }))
      }
      ret.unshift({contents: [""]},{contents: [""]},{contents: [""]},{contents: [""]})
      ret.push({contents: [""], time: this.currentSong.durationSecond})
      return ret
    },
    ...mapState([
      'currentSong', 
      'currentTime', 
      'playing',
      'playMode',
      'isPlayerShow',
    ]),
    ...mapGetters(['hasCurrentSong', 'prevSong', 'nextSong'])
  },
  watch: {
    currentSong(newSong, oldSong) {
      // 单曲循环
      if (oldSong && newSong.id === oldSong.id) {
        this.setCurrentTime(0)
        this.audio.currentTime = 0
        this.play()
        return
      }
      this.songReady = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.play()
      }, 1000)
      this.updateLyric()
    },
    activeLyricIndex(newIndex, oldIndex) {
      if (
        newIndex !== oldIndex &&
        !this.lyricScrolling[SCROLL_TYPE]
      ) {
        this.scrollToActiveLyric()
      }
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause()
      })
    }
  },
  components: {
    NowPlaylist
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
.player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: $player-bgcolor;
    overflow: hidden;
    
    .background {
      position: absolute;
      top: 20%;
      left: 0;
      right: 0;
      bottom: 20%;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.8);
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
        width: 40px;
      }
      .song-name {
        @include text-ellipsis();
        width: 80%;
        margin: 0 auto;
        padding-top: 10px;
        text-align: center;
        vertical-align: unset;
        font-size: $font-size-lg;
        color: $white;
      }
      .song-singer {
        line-height: 16px;
        text-align: center;
        font-size: $font-size-sm;
        color: $white;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .play-bar {
          width: 96px;
          height: 137px;
          position: absolute;
          top: -26px;
          left: 50%;
          margin-left: -16px;
          z-index: 99;
          transform-origin: 12px 0;
          transform: rotate(-10deg);
          transition: all 0.3s;

          &.playing {
            transform: rotate(0deg);
          }
        }
        .cd-wrap {
          position: absolute;
          left: 10%;
          top: 50px;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }

            .play-disc {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              
            }
            .image {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 62%;
              height: 62%;
              border-radius: 50%;
            }
          }
        }
      }

      .middle-r {
        opacity: 0;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        text-align: center;
        mask-image: linear-gradient(
          180deg,
          hsla(0, 0%, 100%, 0) 0,
          hsla(0, 0%, 100%, 0.9) 14%,
          #fff 25%,
          #fff 75%,
          hsla(0, 0%, 100%, 0.9) 86%,
          hsla(0, 0%, 100%, 0)
        );

        .lyric-item {
          margin-bottom: 16px;
          font-size: $font-size;
          color: hsla(0,0%,100%,.6);

          &.active {
            color: $white;
            font-weight: $font-weight-bold;
          }

          .lyric-text {
            min-height: 16.8px;
            margin-bottom: 8px;
            white-space: normal;
            width: 80%;
            margin: 0 auto;
          }
        }
      }
      
    }

    .bottom {
      position: absolute;
      bottom: 60px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
        .time {
          color: $white;
          font-size: $font-size-sm;
          flex: 0 0 40px;
          width: 40px;
          line-height: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $white;
          text-align: center;
        }
      }
    }

    &.normal-enter-active, 
    &.normal-leave-active {
      transition: all 0.4s;
      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter, 
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    position: fixed;
    z-index: 99;
    top: 3px;
    right: 4px;
    img {
      border-radius: 50%;
      position: absolute;
      left: 4px;
      top: 4px;
      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
    }
    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s
    }
    &.mini-enter, &.mini-leave-to {
      opacity: 0
    }
  }
}
</style>
