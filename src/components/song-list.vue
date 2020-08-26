<template>
  <div class='song-list'>
    <div class="button-wrap">
      <PlayIcon  />
      <div class="button-name">
        <span>播放全部</span>
        <span class="song-count">{{`(共${songs.length}首)`}}</span>
      </div>
    </div>
    <ul>
      <li 
        v-for="(song, index) in songs"
        :key="song.id"
        class="song-item"
      >
        <div class="index-wrap">
          <span v-text="index + 1"></span>
        </div>
        <div class="song-content">
          <p class="song-name">{{ song.name }}</p>
          <p class="singer">{{ song.artistsText + ' - ' + song.albumName}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
}
</script>
<style lang='scss' scoped>
.song-list {
  background: $white;
  border-radius: 20px 20px 0 0;

  .button-wrap {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 10px 8px;
    .button-name {
      margin-left: 8px;
      font-weight: bold;
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
    height: 50px;

    .index-wrap {
      text-align: center;
      justify-content: center;
      width: 40px;
      font-size: $font-size-lg;
      color: #999;
    }

    .song-content {
      flex: 1;
      .song-name {
        padding: 6px 0;
        font-size: $font-size-lg;
      }
      .singer {
        @include text-ellipsis();
        font-size: $font-size-sm;
        color: #888;
      }
    }
  }
}
</style>