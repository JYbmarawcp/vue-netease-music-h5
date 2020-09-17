<template>
  <div class="video-wrap">
    <Scroll v-if="videos" ref="videoscroll">
      <div 
        class="player" 
        v-for="(item, index) in videos" 
        :key="index"
      >
        <VideoPlayer
          class="video"
          :url="item.data.urlInfo.url" 
          ref="video" 
          @videoready="ready" 
        />
        <p class="title">{{item.data.title}}</p>
        <div class="desc-wrap">
          <div class="author-wrap" v-if="item.data.creator">
            <div class="avatar">
              <img v-lazy="$utils.genImgUrl(item.data.creator.avatarUrl, 40)" alt="">
            </div>
            <p class="author">{{item.data.creator.nickname}}</p>
          </div>
          <div class="good">
            <Icon type="good" :size="18" />
            <span class="count">{{item.data.praisedCount}}</span>
          </div>
          <div class="pinglun">
            <Icon type="pinglun" :size="18" />
            <span class="count">{{item.data.commentCount}}</span>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getSinger, getVideoRecommend } from '@/api'
export default {
  data () {
    return {
      videos: []
    }
  },
  async created () {
    const { cookie } = await getSinger()
    const { datas } = await getVideoRecommend(cookie)
    this.videos = datas.filter((data) => {
      return data.data.urlInfo && data.data.urlInfo !== {}
    })
  },
  methods: {
    ready() {
      this.$refs.videoscroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrap {
  height: calc(100vh - 84px);
  position: relative;
  background: #eeeff0;

  .player {
    margin: 10px 0;
    padding: 8px 8px 0;
    overflow: hidden;
    border-radius: 4px;
    background: $white;

    .video {
      border-radius: 6px;
    }

    .title {
      width: 100%;
      font-size: $font-size-lg;
      line-height: 30px;
      font-weight: bold;
    }

    .desc-wrap {
      border-top: 1px solid #cccccc;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author-wrap {
        display: flex;
        align-items: center;
        flex: 1;

        .avatar {
          @include img-wrap(30px);
          margin-right: 4px;
          img {
            border-radius: 50%;
          }
        }
        .author {
          font-size: $font-size;
        }
      }

      .good,.pinglun {
        color: gray;
        margin-right: 40px;
        position: relative;
        .count {
          position: absolute;
          font-size: $font-size-sm;
          top: 0;
        }
      }
    }
  }
}
</style>