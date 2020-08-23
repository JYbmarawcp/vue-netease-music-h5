<template>
  <div class="recommend">
    <Slider v-if="banners.length">
      <div class="slide-item" v-for="banner in banners" :key="banner.scm">
        <img :src="banner.imageUrl" />
      </div>
    </Slider>
    <h2>人气歌单推荐</h2>
    
  </div>
</template>

<script>
import { getBanner } from '@/api'
import { getPersonalized } from '@/api'

export default {
  name: 'Recommend',
  async created() {
    const { banners } = await getBanner()
    const { result } = await getPersonalized()
    this.banners = banners
    this.list = result
  },
  data() {
    return {
      banners: [],
      list: [],
    }
  },
  components: {},
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
