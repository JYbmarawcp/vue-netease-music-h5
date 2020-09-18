<template>
  <transition name="nowlist">
    <div class="now-playlist" @click="close" v-show="isPlaylistShow">
      <div class="playlist-wrap" @click.stop>
        <div class="header">
          <p>
            <span class="totalFont">当前播放</span>
            <span class="total">({{playlist.length}})</span>
          </p>
          <div
            @click="clear"
            class="remove"
            v-if="playlist.length"
          >
            <Icon type="remove" />
          </div>
        </div> 
        <ul class="songlist">
          <Scroll v-if="playlist.length" ref="plScroll">
            <li
              class="songContent"
              v-for="(song, index) in playlist"
              :key="song.id"
              @click="selectSong(song)"
            >
              <div
                class="addBorder" 
                :class="[songCls(song.id), { border: index === playlist.length-1}]"
              >
                <Icon v-if="isActiveSong(song.id)"
                  class="horn"
                  type="horn"
                  :size="14"
                  color="theme"
                />
                {{song.name}}
                <span class="artists">-{{song.artistsText}}</span>
              </div>
            </li>
          </Scroll>
        </ul>

        <div class="closeList" @click="close">
          关闭
        </div>
      </div>
    </div>

  </transition>

</template>

<script>
import { mapState, mapMutations, mapActions } from "@/store/helper/music"
export default {
  data () {
    return {
      
    }
  },
  methods: {
    clear() {
      console.log(123)
    },
    selectSong(song) {
      this.startSong(song)
      this.setPlayingState(true)
    },
    close() {
      this.setPlaylistShow(false)
    },
    isActiveSong(id) {
      return id === this.currentSong.id
    },
    songCls(id) {
      return this.isActiveSong(id) ? 'playing' : ''
    },
    ...mapMutations(["setPlayingState", "setPlaylistShow"]),
    ...mapActions(["startSong"])
  },
  computed: {
    ...mapState(["isPlaylistShow", "playlist", "currentSong"])
  },
  watch: {
    playlist: {
      handler() {
        this.$nextTick(() => {
          this.$refs.plScroll.refresh()
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.nowlist-enter-active, 
.nowlist-leave-active {
  transition: opacity 0.4s;
  .playlist-wrap {
    transition: all 0.4s ease;
  }
}
.nowlist-enter, 
.nowlist-leave-to {
  opacity: 0;
  .playlist-wrap {
    transform: translate3d(0, 100%, 0);
  }
}
.now-playlist {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 4px;
  top: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);

  .playlist-wrap {
    position: absolute;
    bottom: 1%;
    left: 4%;
    right: 4%;
    width: 92%;
    height: 69%;
    background: $white;
    border-radius: 16px;
    padding-top: 14px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 14px;
      
      .totalFont {
        font-weight: bold;
        letter-spacing: 0.5px;
      }
      .total {
        font-size: $font-size;
        color: gray;
        margin-left: 2px;
      }
      .remove {
        padding: 5px 14px;
      }
    }
    .songlist {
      height: 83%;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .songContent {
        width: 100%;
        line-height: 40px;
        padding-left: 14px;

        .addBorder {
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          @include text-ellipsis();
          &.playing {
            color: red;
            .artists {
              color: red;
            }
          }
          &.border {
            border: none;
          }
          .artists {
            font-size: $font-size-sm;
            color: #888;
          }
        }
      }
    }

    .closeList {
      text-align: center;
      line-height: 44px;
    }
  }
}

</style>