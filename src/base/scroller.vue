<template>
  <div class="scroller" ref="scroller">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

const defaultOptions = {
  scrollY: true,
  probeType: 3,
}
export default {
  name: 'Scroller',
  props: {
    click: {
      type: Boolean,
      default: false,
    },
    data: {
      default: () => [],
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getScroller() {
      return this.scroller
    },
    refresh() {
      this.scroller.refresh()
    },
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if (!this.scroller) {
            this.scroller = new BScroll(
              this.$refs.scroller,
              Object.assign({}, defaultOptions, this.option)
            )
            this.$emit('init', this.scroller)
          } else {
            this.scroller && this.scroller.refresh()
          }
        })
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
.scroller {
  position: relative;
  overflow: hidden;
  height: 100%;
}
</style>
