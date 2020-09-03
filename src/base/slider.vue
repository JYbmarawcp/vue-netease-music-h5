<template>
  <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-scroll" ref="slide">
        <div class="slide-banner-wrapper">
          <slot></slot>
        </div>
      </div>
      <div class="docs-wrapper" v-if="showDoc">
        <span
          class="doc"
          v-for="(item, index) in 10"
          :key="index"
          :class="{ active: currentPageIndex === index }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)
const defaultOptions = {
    scrollX: true,
    scrollY: false,
    eventPassthrough: 'vertical',
    slide: {
      threshold: 100
    },
    momentum: false,
    bounce: false,
    stopPropagation: true
}
export default {
  name: "Slider",
  data() {
    return {
      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
    }
  },
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    showDoc: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.slide.destroy()
  },
  methods: {
    init() {
      console.log(Object.assign({}, defaultOptions, this.options));
      clearTimeout(this.playTimer)
      this.slide = new BScroll(
        this.$refs.slide, 
        Object.assign({}, defaultOptions, this.options)
      )
      this.slide.on('scrollEnd', this._onScrollEnd)

      // user touches the slide area
      this.slide.on('beforeScrollStart', () => {
        clearTimeout(this.playTimer)
      })
      // user touched the slide done
      this.slide.on('scrollEnd', () => {
        this.autoGoNext()
      })
      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
      this.autoGoNext()
    },
    nextPage() {
      this.slide.next()
    },
    prePage() {
      this.slide.prev()
    },
    _onScrollEnd() {
      this.autoGoNext()
      this.slide.refresh()
    },
    autoGoNext() {
      if (this.autoPlay) {
        clearTimeout(this.playTimer)
        this.playTimer = setTimeout(() => {
          this.nextPage()
        }, 3000)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.slide-banner {
  .banner-wrapper {
    position: relative;

    .slide-banner-scroll {
      min-height: 1px;
      // overflow-x: hidden;

      .slide-banner-wrapper {
        white-space: nowrap;
        font-size: 0;
      }
    }

    .docs-wrapper {
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);

      .doc {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #eee;
        &.active {
          width: 20px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
