<template>
  <div class="scroll-wrapper" ref="scroll">
    <div 
      class="scroll-content"
      :style="scrollStyle"
    >
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
  name: 'Scroll',
  props: {
    data: {
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getScroll() {
      return this.scroll
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.scroll.on(name, handler)
      })
    },
    clickHandler (item) {
      alert(item)
    },
  },
  beforeDestroy() {
    this.scroll.destroy()
  },
  computed: {
    scrollStyle() {
      if (!this.horizontal) {
        return
      }
      return { 'display': 'inline-block '}
    }
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(
              this.$refs.scroll,
              Object.assign({}, defaultOptions, this.options)
            )
            this._registerHooks(['scroll', 'scrollEnd'])
            this.$emit('init', this.scroll)
          } else {
            this.scroll && this.scroll.refresh()
          }
        })
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  overflow: hidden;
  height: 100%;
}
</style>