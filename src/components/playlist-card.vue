<template>
  <div @click="onClickCard" class="playlist-card">
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 300)" >
      <div class="playCount-wrap" v-if="playCount">
        <Icon type="play" />
        {{ $utils.formatNumber(playCount) }}
      </div>
      <div class="updateFrequency" v-if="updateFrequency">
        {{ updateFrequency }}
      </div>
    </div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: ["id", "img", "name", "playCount", "updateFrequency"],
  methods: {
    onClickCard() {
      this.$router.push(`/recommend/playlist/${this.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist-card {
  position: relative;
  margin: 4px;

  .img-wrap {
    
    
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }

    .playCount-wrap {
      display: flex;
      align-items: center;
      position: absolute;
      right: 4px;
      top: 2px;
      font-size: $font-size-sm;
      color: $white;

      i {
        display: inline-block;
      }
    }

    .updateFrequency {
      position: absolute;
      bottom: 4px;
      left: 4px;
      color: $white;
      font-size: $font-size-sm;
    }
  }

  .name {
    font-size: $font-size-sm;
    white-space: normal;
    @include text-ellipsis-multi(2);
  }
}
</style>