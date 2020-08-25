<template>
  <div class="scrollerx" ref="scrollerx">
    <div class="scrollx-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
const defaultOptions = {
  scrollY: true,
  click: true,
  probeType: 3,
}
export default {
  name: 'Scrollerx',
  props: {
    data: {
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getScrollerx() {
      return this.scrollerx
    },
    refresh() {
      this.scrollerx.refresh()
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.scrollerx.on(name, handler)
      })
    },
  },
  beforeDestroy() {
    this.scrollerx.destroy()
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if (!this.scrollerx) {
            this.scrollerx = new BScroll(
              this.$refs.scrollerx,
              Object.assign({}, defaultOptions, this.options)
            )
            this._registerHooks(['scroll', 'scrollEnd'])
            this.$emit('init', this.scrollerx)
          } else {
            this.scrollerx && this.scrollerx.refresh()
          }
        })
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.scrollerx {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  height: 100%;

  .scrollx-content {
    display: inline-block;
  }
}
</style>