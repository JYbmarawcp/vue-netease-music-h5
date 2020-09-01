<template>
  <div class="hot-search">
    <div class="oerder-wrap">
      <span class="order">{{ order }}</span>
    </div>
    <div class="hot-content">
      <div class="hot-name">
        <span>{{ name }}</span>
        <img v-if="icon" :src="icon" alt="">
      </div>
      <p class="hot-desc">{{ desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order", "name", "icon", "desc"],
}
</script>

<style lang="scss" scoped>
.hot-search {
  display: flex;
  width: 50%;
  height: 60px;
  align-items: center;

  .oerder-wrap {
    font-size: $font-size-lg;
    padding-left: 10px;
    width: 30px;
    color: #727272;
  }

  .hot-content {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .hot-name {
      @include text-ellipsis-multi(1);
      font-size: $font-size;

      img {
        margin-left: 6px;
        height: 14px;
      }
    }
    .hot-desc {
      @include text-ellipsis-multi(1);
      font-size: $font-size-sm;
      color: #888;
    }
  }

}
</style>