<template>
  <div id="app">
    <MHeader />
    <MTab />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from "@/components/m-header"
import MTab from "@/components/m-tab"
export default {
  components: {
    MHeader,
    MTab
  }
}
</script>
<style lang="scss">
</style>
