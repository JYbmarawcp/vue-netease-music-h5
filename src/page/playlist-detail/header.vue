<template>
  <div class='playlist-header' v-if="playlist.id">
    <div class="fixed">
      歌单
    </div>
    <div class="plhead_bg" :style="getbg"></div>
    <div class="header">
      <div class="img-wrap">
        <img v-lazy="$utils.genImgUrl(playlist.coverImgUrl, 130)" >
        <div class="playCount-wrap" v-if="playlist.playCount">
          <Icon type="play" />
          {{ $utils.formatNumber(playlist.playCount) }}
        </div>
      </div>
      <div class="content">
        <div class="title-wrap">
          <p class="title">{{ playlist.name }}</p>
        </div>
        <div class="creator-wrap">
          <img class="avatar" :src="$utils.genImgUrl(playlist.creator.avatarUrl, 30)" >
          <p class="creator">{{ playlist.creator.nickname }}</p>
        </div>
        <div class="desc-wrap">
          <p class="desc" v-if="playlist.description">{{ playlist.description }}</p>
          <p class="desc" v-else>{{ 暂无简介 }}</p>
        </div>
      </div>
    </div>
    <div class="button">
      评论
    </div>
  </div>
</template>

<script>

export default {
  props: {
    playlist: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    };
  },
  created() {

  },
  computed: {
    getbg() {
      return {'background-image':`url(${this.playlist.coverImgUrl}?param=170y170)` }
    }
  },
  methods: {

  },
}
</script>
<style lang='scss' scoped>
.playlist-header {
  height: 220px;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.25);
  .fixed {
    position: fixed;
  }
  .plhead_bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    transform: scale(1.5);
    z-index: -1;
    filter: blur(19px);
  }
  .header {
    display: flex;
    padding: 12px;
    position: relative;
    
    .img-wrap {
      position: relative;
      width: 110px;
      height: 110px;
      margin-right: 16px;

      img {
        width: 100%;
        height: 100%;
      }

      .playCount-wrap {
        display: flex;
        align-items: center;
        position: absolute;
        right: 4px;
        top: 1px;
        font-size: $font-size-sm;
        color: $white;
        i {
          display: inline-block;
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .title-wrap {
        margin-bottom: 4px;
        .title {
          font-size: $font-size-lg;
          color: #fefefe;
        }
      }

      .creator-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .creator {
          margin-right: 2px;
          font-size: $font-size;
          color: #e6e6e6;
        }
      }

      .desc-wrap {
        font-size: $font-size-sm;
        color: #d4cdcd;
        @include text-ellipsis-multi(2)
      }
    }
  }
}
</style>