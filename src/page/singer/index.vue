<template>
  <div>

  </div>
</template>

<script>
import { getSinger, getVideoRecommend } from '@/api'
export default {
  data () {
    return {
      cookie: ""
    }
  },
  async created () {
    const { cookie } = await getSinger()
    const { datas } = await getVideoRecommend(cookie)
    console.log(datas);
  },
}
</script>

<style>

</style>