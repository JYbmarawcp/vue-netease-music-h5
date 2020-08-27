<template>
  <div class='playlist-header' v-if="playlist.id">
    
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
      <div @click="goComment">
        <Icon
          type="pinglun" 
          color="white"
          :size="18"
        />
        <p>{{ $utils.formatNumber(playlist.commentCount) }}</p>
      </div>
      <div>
        <Icon
          type="share" 
          color="white"
          :size="18"
        />
        <p>{{ $utils.formatNumber(playlist.shareCount) }}</p>
      </div>
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
    goComment() {
      this.$router.push(`/recommend/playlist/${this.playlist.id}/comment`)
    }
  },
}
</script>
<style lang='scss' scoped>
.playlist-header {
  height: 228px;
  position: relative;
  overflow: hidden;
  
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
        color: hsla(0,0%,100%,.7);
        @include text-ellipsis-multi(2)
      }
    }
  }

  .button {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: $white;
    padding: 4px 0;
    text-align: center;
  }
}
</style>