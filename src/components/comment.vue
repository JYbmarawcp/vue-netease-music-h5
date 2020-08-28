<template>
  <div class="comment" v-if="comment">
    <div class="avatar">
      <img @load="load" v-lazy="$utils.genImgUrl(comment.user.avatarUrl, 80)" alt="">
      <div class="user">
        <p class="username">{{ comment.user.nickname }}</p>
        <p class="date">{{ $utils.formatDate(comment.time) }}</p>
      </div>
      <div>
        <span class="likedCount">{{ comment.likedCount }}</span>
        <Icon
          type="good"
          :size="12"
        />
      </div>
    </div>
    <div class="content">
      <span class="text">{{ comment.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  methods: {
    load() {
      this.$emit("load")
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  background: #f8f8f8;

  .avatar {
    display: flex;
    padding: 4px 12px;
    justify-content: space-between;
    align-items: center;
    img {
      width: 40px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .user {
      flex: 1;
      color: $blue;
      font-size: $font-size;
      margin-top: 4px;

      .date {
        margin-top: 4px;
        color: #999;
        font-size: $font-size-sm;
      }
    }

    .likedCount {
      color: #999;
      font-size: $font-size-sm;
      margin-right: 4px;
    }
  }

  .content {
    padding: 4px 12px;
    margin-left: 52px;
    font-size: $font-size;
    color: #333333;
    line-height: 22px;
    border-bottom: 1px solid #cccccc;
  }
}
</style>