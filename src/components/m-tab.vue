<template>
  <div class="m-tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.m-tab {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: $font-size;
  border-bottom: 1px solid #cccccc;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding: 0 5px 10px ;
      color: $font-color;
    }

    &.router-link-active {
      .tab-link {
        color: $theme-color;
        border-bottom: 2px solid $theme-color;
      }
    }
  }
}
</style>