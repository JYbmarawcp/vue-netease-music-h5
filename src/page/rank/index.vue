<template>
  <div class="rank">
    <Scroll v-if="moreLists.length ">
      <Title class="title">官方榜</Title>
      <ToplistCard 
        v-for="list in topLists"
        :key="list.id"
        :id="list.id"
        :img="list.coverImgUrl"
        :songs="list.tracks"
        :updateFrequency="list.updateFrequency"
      />
      <Title class="title">特色榜</Title>
      <div class="world-wrap">
        <PlaylistCard
          class="playlist"
          v-for="list in myLists"
          :id="list.id"
          :key="list.id"
          :img="list.coverImgUrl"
          :name="list.name"
          :updateFrequency="list.updateFrequency"
        />
      </div>
      <Title class="title">全球榜</Title>
      <div class="world-wrap">
        <PlaylistCard
          class="playlist"
          v-for="list in worldLists"
          :id="list.id"
          :key="list.id"
          :img="list.coverImgUrl"
          :name="list.name"
          :updateFrequency="list.updateFrequency"
        />
      </div>
      <Title class="title">更多榜单</Title>
      <div class="world-wrap">
        <PlaylistCard
          class="playlist"
          v-for="list in moreLists"
          :id="list.id"
          :key="list.id"
          :img="list.coverImgUrl"
          :name="list.name"
          :updateFrequency="list.updateFrequency"
        />
      </div>
    </Scroll> 
  </div>
</template>

<script>
import { getToplist } from "@/api"
import ToplistCard from "@/components/topList-card"
import PlaylistCard from "@/components/playlist-card"

export default {
  name: "Rank",
  async created () {
    const { list } = await getToplist()
    this.topLists = list.filter((item) => item.ToplistType)
    this.myLists = [].concat(list[7], list[9], list[17])
    this.worldLists = [].concat(list.slice(14, 17), list.slice(18, 20), list[24])
    this.moreLists = [].concat(list.slice(25))
  },
  data () {
    return {
      topLists: [],
      myLists: [],
      worldLists: [],
      moreLists: []
    }
  },
  components: {
    ToplistCard,
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.rank {
  height: calc(100vh - 84px);
  position: relative;

  .title {
    padding-left: 14px;
  }

  .world-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .playlist {
      width: 30%;
    }
  }
}
</style>