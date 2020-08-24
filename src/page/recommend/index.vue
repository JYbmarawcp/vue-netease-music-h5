<template>
  <div class="recommend">
    <Slider
      :options="{ slide: {loop: true,threshold: 100} }"
      v-if="banners.length"
    >
      <div class="slide-item" v-for="banner in banners" :key="banner.scm">
        <img :src="banner.imageUrl" />
      </div>
    </Slider>
    <NewPlaylists />
    <NewSongs />
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
  components: {
    NewPlaylists,
    NewSongs,
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  .slide-item {
    display: inline-block;
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
