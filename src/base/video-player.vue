<template>
  <div
    class="video-player"
    ref="player"
  >
  </div>
</template>

<script>
import Player from "xgplayer"

export default {
  name: "VideoPlayer",
  props: ["url"],
  mounted () {
    this.initPlayer()
    this.transferRem()
  },
  methods: {
    initPlayer() {
      if (!this.url) return
      this.player = new Player({
        el: this.$refs.player,
        url: this.url,
        videoInit: true,
        lang: "zh-cn",
        width: "100%",
      })
    },
    transferRem() {
      this.player.on("ready", () => {
        const videoWrapper = this.$refs.player
        videoWrapper.style.height = "212px"
        this.$emit("videoready")
      })
    }
  },
  watch: {
    url(url, oldUrl) {
      if (url && url !== oldUrl) {
        if (!this.player) {
          this.initPlayer()
        } else {
          this.player.src = url
          this.player.reload()
        }
      }
    }
  }
}
</script>

<style>
</style>