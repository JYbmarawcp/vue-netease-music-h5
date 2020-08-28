<template>
  <Scroll class="comments-wrap">
    <div class="block">
      <p class="title">精彩评论</p>
      <Comment
        :comment="comment"
        v-for="comment in hotComments"
        :key="comment.id"
      />
    </div>
    <div class="block">
      <p class="title">最新评论</p>
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @load="loadImg"
      />
    </div>
  </Scroll>
</template>

<script>
import { 
  getSongComment,
  getPlaylistComment,
  getHotComment,
  getMvComment
} from "@/api"
import Comment from "./comment"

const SONG_TYPE = "song"
const PLAYLIST_TYPE = "playlist"
const MV_TYPE = "mv"

const PAGE_SIZE = 20
export default {
  props: {
    id: {
      type: Number,
      require: true
    },
    type: {
      type: String,
      default: SONG_TYPE
    }
  },
  created () {
    this.PAGE_SIZE = PAGE_SIZE
  },
  data () {
    return {
      loading: false,
      hotComments: [],
      comments: [],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    loadImg() {
      this.$emit("load")
    },
    async getComment() {
      this.loading = true
      const commentRequestMap = {
        [PLAYLIST_TYPE]: getPlaylistComment,
        [SONG_TYPE]: getSongComment,
        [MV_TYPE]: getMvComment,
      }
      const commentRequest = commentRequestMap[this.type]
      const { hotComments = [], comments = [], total } = await commentRequest({
        id: this.id,
        pageSize: PAGE_SIZE,
      }).finally(() => {
        this.loading = true
      })

      // 歌单的热评需要单独请求接口获取
      if (this.type === PLAYLIST_TYPE && this.currentPage === 1) {
        const { hotComments: exactHotComments = [] } = await getHotComment({
          id: this.id,
          type: 2
        })
        this.hotComments = exactHotComments
      } else {
        this.hotComments = hotComments
      }
      this.comments = comments
      this.total = total
      this.$emit("update", { comments, hotComments, total })
    },

  },
  watch: {
    id: {
      handler(newID) {
        if (newID) {
          this.currentPage = 1
          this.getComment()
        }
      },
      immediate: true
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>
.comments-wrap {
  height: 500px;
  
}
.block {
  background: #f8f8f8;
  overflow: scroll;
  .title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    padding-left: 12px;
    height: 34px;
    line-height: 34px;
  }
}
</style>