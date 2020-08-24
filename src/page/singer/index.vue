<template>
  <div>

  </div>
</template>

<script>
import { getSinger } from '@/api'
import { getSong } from '@/api'
export default {
  data () {
    return {
      cookie: ""
    }
  },
  async created () {
    const { cookie } = await getSinger()
    const { result } = await getSong(cookie)
    this.cookie = cookie
    console.log(cookie);
    console.log(result);
  },
}
</script>

<style>

</style>