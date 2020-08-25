<template>
  <div class="new-playlists">
    <Title>人气歌单推荐</Title>
    <Scrollerx
      class="list-wrap"
      :options="{scrollX: true, scrollY:false}"
      :horizontal="true"
      v-if="list.length"
    >
      <PlaylistCard
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :img="item.picUrl"
        :name="item.name"
        :playCount="item.playCount"
        class="list-item"
      />
    </Scrollerx>
  </div>
</template>

<script>
import { getPersonalized } from '@/api'
import PlaylistCard from "@/components/playlist-card"

export default {
  data () {
    return {
      list: []
    }
  },
  async created () {
    const { result } = await getPersonalized({ limit: 6 })
    this.list = result
  },
  components: {
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  .list-item {
    display: inline-block;
    width: 110px;
  }
}

</style>