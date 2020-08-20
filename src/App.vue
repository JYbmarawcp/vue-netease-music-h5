<template>
  <div id="app">
    <MHeader />
    <MTab />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#nav {
  padding: 30px;
}
</style>
