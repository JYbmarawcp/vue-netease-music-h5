<template>
  <div @click="onClickCard" class="topList-card">
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 120)" >
      <div class="update" v-if="updateFrequency">
        {{ updateFrequency }}
      </div>
    </div>
    <div class="list-content">
      <p v-for="(song, index) in songs" :key="index" class="song-content">
        {{ index + 1 }}.{{ song.first }} - {{ song.second }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      require: true
    },
    songs: {
      type: Array,
      default: () => []
    },
    updateFrequency: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      require: true
    }
  },
  methods: {
    onClickCard() {
      this.$router.push(`/recommend/playlist/${this.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.topList-card {
  width: 100%;
  padding: 0 14px 4px;
  display: flex;
  .img-wrap {
    position: relative;
    img {
      width: 110px;
      height: 110px;
      border-radius: 6px;
    }

    .update {
      position: absolute;
      bottom: 8px;
      left: 4px;
      color: $white;
      font-size: $font-size-sm;
    }
  }

  .list-content {
    flex: 1;
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: $font-size;
    
    .song-content {
      @include text-ellipsis-multi(1);
      line-height: 26px;
    }
  }
}
</style>