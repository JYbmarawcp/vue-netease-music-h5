<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" 
      viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
// viewBox: 最小X轴数值;最小y轴数值;宽度;高度(前两个一般都是0)
export default {
  name: "ProgressCircle",
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-circle {
  position: relative;
  circle {
    stroke-width: 5px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke:hsla(0,0%,100%,.5);
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $white;
    }
  }
}
</style>