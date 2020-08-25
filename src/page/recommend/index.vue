<template>
  <div class="recommend">
    <Scroll v-if="banners.length" ref="scroller">
      <Slider
        :options="{ slide: {loop: true,threshold: 100} }"
        v-if="banners.length"
      >
        <div class="slide-item" v-for="banner in banners" :key="banner.scm">
          <img :src="banner.imageUrl" @load="loadImage" />
        </div>
      </Slider>
      <NewPlaylists />
      <NewSongs @loadImage="loadImage" />
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getBanner } from '@/api'

import NewPlaylists from "./new-playlists"
import NewSongs from "./new-songs"
export default {
  name: 'Recommend',
  async created() {
    const { banners } = await getBanner()
    this.banners = banners
  },
  data() {
    return {
      banners: [],
    }
  },
  methods: {
    loadImage() {
      this.$refs.scroller.refresh()
    }
  },
  components: {
    NewPlaylists,
    NewSongs,
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 84px;
  width: 100%;
  bottom: 0;
  .slide-item {
    display: inline-block;
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
