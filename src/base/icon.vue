<script>
import { toRem } from "@/utils"

export default {
  name: "Icon",
  props: {
    size: {
      type: Number,
      default: 16
    },
    type: {
      type: String,
      require: true
    },
    color: {
      type: String,
      default: ""
    }
  },
  methods: {
    getIconClass() {
      let cls = `icon-${this.type}`
      if (this.color) {
        cls += ` icon-color-${this.color}`
      }
      return cls
    },
    getIconStyle() {
      const retStyle = { fontSize: toRem(this.size) }
      return retStyle
    }
  },
  render() {
    return (
      <i 
        class={`iconfont ${this.getIconClass()}`}
        style={this.getIconStyle()}
      ></i>
    )
  }
}
</script>

<style lang="scss" scoped>
.icon-color {
  // 通过prop传入这几个字段
  // 可以使用默认的几个颜色
  &-theme {
    color: $theme-color;
  }
  &-white {
    color: $white;
  }
  &-shallow {
    color: var(--font-color-shallow-grey);
  }
}
</style>