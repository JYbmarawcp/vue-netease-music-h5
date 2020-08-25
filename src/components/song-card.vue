<template>
  <div class="song-card">
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 120)" @load="loadImage" >
    </div>
    <div class="song-content">
      <p class="song-name">{{ name }}</p>
      <p class="singer">{{ artistsText }}</p>
    </div>
    <PlayIcon />
  </div>
</template>

<script>
export default {
  props: ["name", "img", "artistsText"],
  methods: {
    loadImage() {
      this.$emit('loadImg')
    }
  }
}
</script>

<style lang="scss" scoped>
.song-card {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: $font-size-sm;

  .img-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .song-content {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    overflow: hidden;

    .song-name {
      @include text-ellipsis;
      font-size: $font-size;
    }

    .singer {
      @include text-ellipsis;
      color: #333333;
    }
  }
}
</style>