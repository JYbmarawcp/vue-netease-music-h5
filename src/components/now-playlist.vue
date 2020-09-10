<template>
  <div class="now-playlist" v-show="isPlaylistShow">
    123
  </div>
</template>

<script>
import { mapState } from "@/store/helper/music"
export default {
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  computed: {
    ...mapState(["isPlaylistShow"])
  }
}
</script>

<style lang="scss" scoped>
.now-playlist {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
}
</style>