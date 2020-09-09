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
            <span class="time time-l">{{currentTime}}</span>
            <div class="progress-bar-wrapper">

            </div>
            <span class="time time-r">{{duration}}</span>
          </div>
          <div class="operators">
            <Icon 
              :type="modeIcon"
              class="mode-icon"
            />
            <Icon 
              type="prev"
              class="icon"
            />
            <Icon 
              type="play"
            />
            <Icon 
              type="next"
            />
            <Icon 
              type="playlist"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
} from '@/store/helper/music'

export default {
  data () {
    return {
      
    }
  },
  methods: {
    back() {
      this.setPlayerShow(false)
    },
    ...mapMutations(["setPlayerShow"])
  },
  computed: {
    modeIcon() {
      return this.currentMode.icon
    },
    ...mapState(['currentSong', 'currentTime', 'playing', 'isPlayerShow']),
    ...mapGetters(['hasCurrentSong'])
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
