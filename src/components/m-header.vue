<template>
  <div class="m-header">
    <Icon class="icon" type="music" :size="24" color="white" />
    <h1 class="text">网易云音乐</h1>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.m-header {
  position: relative;
  height: 44px;
  background: $theme-color;
  text-align: center;
  .icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 9px;
  }
  .text {
    display: inline-block;
    line-height: 44px;
    font-size: $font-size-lg;
    color: $white;
  }
}
</style>