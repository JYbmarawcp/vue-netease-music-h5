<template>
  <div class='song-list'>
    <div class="button-wrap">
      <PlayIcon  />
      <div class="button-name">
        <span>全部播放</span>
        <span class="song-count">{{`(共${songs.length}首)`}}</span>  
      </div>
    </div>
    <ul>
      <li
        @click="onRowClick(song)"
        v-for="(song, index) in songs"
        :key="song.id"
        class="song-item"
      >
        <div class="index-wrap" v-if="orderShow">
          <Icon v-if="isActiveSong(song.id)"
            class="horn"
            type="horn"
            color="theme"
          />
          <span v-else v-text="index + 1"></span>
        </div>
        <div class="song-content">
          <p class="song-name" :class="songCls(song.id)">{{ song.name }}</p>
          <p class="singer">{{ song.artistsText + ' - ' + song.albumName}}</p>
        </div>
        <div
          class="icon-wrap" 
          v-if="song.mvId"
        >
          <Icon
            class="mv-icon"
            type="mv"
            color="theme"
            :size="22"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from '@/store/helper/music'

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    orderShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    };
  },
  methods: {
    onRowClick(song) {
      this.startSong(song)
      this.setPlayerShow(true)
      this.setPlaylist(this.songs)
    },
    isActiveSong(id) {
      return id === this.currentSong.id
    },
    songCls(id) {
      return this.isActiveSong(id) ? 'playing' : ''
    },
    ...mapActions(["startSong"]),
    ...mapMutations(["setPlaylist", "setPlayerShow"])
  },
  computed: {
    ...mapState(["currentSong"])
  }
}
</script>
<style lang='scss' scoped>
.song-list {
  background: #f8f8f8;
  border-radius: 20px 20px 0 0;

  .button-wrap {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 10px 8px;
    .button-name {
      margin-left: 8px;
      font-weight: bold;
      font-size: $font-size-lg;

      .song-count {
        font-size: $font-size-sm;
        margin-left: 4px;
        vertical-align: middle;
        color: gray;
        font-weight: 400;
      }
    }
    .right {
      background: #ff3a3a;
    }
  }
  .song-item {
    display: flex;
    align-items: center;
    height: 60px;

    .index-wrap {
      text-align: center;
      justify-content: center;
      width: 40px;
      font-size: $font-size-lg;
      color: #999;
    }

    .song-content {
      flex: 1;
      width: 280px;

      .song-name {
        padding: 6px 0;
        font-size: $font-size-lg;
        @include text-ellipsis();
        &.playing {
          color: $theme-color;
        }
      }
      .singer {
        font-size: $font-size-sm;
        color: #888;
        @include text-ellipsis();
      }
    }

    .icon-wrap {
      padding: 12px 0;
      width: 40px;
    }
  }
}
</style>