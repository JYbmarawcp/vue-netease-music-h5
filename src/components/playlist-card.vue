<template>
  <div class="playlist-card">
    <div class="img-wrap">
      <img src="" alt="">
      <div class="desc-wrap">
        <span class="desc">{{ desc }}</span>
      </div>
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: ["id", "img", "name", "desc"],
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.playlist-card {
  position: relative;
  width: 30%;
}
</style>