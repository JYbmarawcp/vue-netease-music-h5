<template>
  <div class="song-card">
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 120)" >
    </div>
    <div class="song-content">
      <p class="song-name">{{ name }}</p>
      <p class="singer">{{ artistsText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "img", "artistsText"],
}
</script>

<style lang="scss" scoped>
.song-card {
  display: flex;
  
}
</style>