<template>
  <div class="scroller" ref="scroller">
    <div class="scroll-content">
      <slot></slot>
    </div>
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
    options: {
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
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.scroller.on(name, handler)
      })
    }
  },
  beforeDestroy() {
    this.scroller.destroy()
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if (!this.scroller) {
            this.scroller = new BScroll(
              this.$refs.scroller,
              Object.assign({}, defaultOptions, this.options)
            )
            this._registerHooks(['scroll', 'scrollEnd'], (pos) => {
              console.log(pos)
            })
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
  white-space: nowrap;
  height: 100%;

  .scroll-content {
    display: inline-block;
  }
}
</style>