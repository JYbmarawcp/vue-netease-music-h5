<template>
  <div class="title-wrap">
    <p class="title">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "Title"
}
</script>

<style lang="scss" scoped>
.title-wrap {
  display: flex;
  padding: 12px 0;

  .title {
    font-size: $font-size-title;
    color: #333333;
    font-weight: $font-weight-bold;
  }
}
</style>