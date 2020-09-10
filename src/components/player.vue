<template>
  <div 
    class="player" 
    v-if="hasCurrentSong"
  >
    <transition name="normal">
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
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrap" ref="cdWrap">
              <div class="cd" :class="cdCls">
                <img class="play-disc" src="@/assets/play-disc.png" alt="">
                <img class="image" :src="$utils.genImgUrl(currentSong.img, 200)">
              </div>
            </div>
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
              type="playlist"
              :size="24"
              class="icon"
            />
          </div>
        </div>
      </div>
    </transition>

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
import { playModeMap } from "@/utils"
import {
  mapState,
  mapGetters,
  mapMutations,
} from '@/store/helper/music'

export default {
  data () {
    return {
      songReady: false,
      currentShow: 'cd',
    }
  },
  methods: {
    back() {
      this.setPlayerShow(false)
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
    ...mapMutations([
      "setPlayerShow",
      "setPlayMode",
      "setPlayingState",
      "setCurrentTime",
    ])
  },
  computed: {
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
      }, 1000);
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause()
      })
    }
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
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrap {
          position: absolute;
          left: 10%;
          top: 0;
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
}
</style>
