<template>
  <div class="rank">
    <ToplistCard 
      v-for="list in topLists"
      :key="list.id"
      :id="list.id"
      :img="list.coverImgUrl"
      :songs="list.tracks"
      :updateFrequency="list.updateFrequency"
    />
  </div>
</template>

<script>
import { getToplist } from "@/api"
import ToplistCard from "@/components/topList-card"

export default {
  name: "Rank",
  async created () {
    const { list } = await getToplist()
    this.topLists = list.filter((item) => item.ToplistType)

    console.log(this.topList);
  },
  data () {
    return {
      topLists: [],
      moreLists: []
    }
  },
  methods: {
    
  },
  components: {
    ToplistCard
  }
}
</script>

<style lang="scss" scoped>
.rank {

}
</style>