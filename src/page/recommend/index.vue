<template>
  <div class="recommend">
    <h2>你的歌单精选站</h2>
  </div>
</template>

<script>
import { getPersonalized } from "@/api"
export default {
  name: 'Recommend',
  async created () {
    const { result } = await getPersonalized()
    this.list = result
  },
  data () {
    return {
      list: []
    }
  },
  components: {
  }
}
</script>
