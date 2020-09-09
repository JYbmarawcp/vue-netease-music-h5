<template>
  <div id="app">
    <MHeader />
    <MTab />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player />
  </div>
</template>

<script>
import MHeader from "@/components/m-header"
import MTab from "@/components/m-tab"
import Player from "@/components/player"

export default {
  components: {
    MHeader,
    MTab,
    Player
  }
}
</script>
<style lang="scss">
</style>
