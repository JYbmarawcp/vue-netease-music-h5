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
  &-white {
    color: $white;
  }
}
</style>