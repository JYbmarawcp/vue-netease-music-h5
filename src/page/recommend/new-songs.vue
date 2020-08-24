<template>
  <div class="new-songs" v-if="list.length">
    <Title>最新音乐</Title>
    <Slider v-if="list.length"
      :options="{ slide: {loop: false,threshold: 100}, bounce: true }"
      :autoPlay="false"
    >
      <div
        v-for="(list, listIndex) in thunkedList"
        :key="listIndex"
        class="list"
      >
        <SongCard 
          v-for="(item, index) in list"
          v-bind="nomalizeSong(item)"
          :key="item.id"
          class="song-card"
          @click.native="onClickSong(listIndex, index)"
        />
      </div>
    </Slider>
  </div>
</template>

<script>
import { getNewSongs } from "@/api"
import { createSong } from "@/utils"
import SongCard from "@/components/song-card"

export default {
  async created () {
    const { result } = await getNewSongs()
    this.list = result
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    thunkedList() {
      return [
        this.list.slice(0, 3),
        this.list.slice(3, 6),
        this.list.slice(6, 9)
      ]
    }
  },
  methods: {
    onClickSong(listIndex, index) {
      console.log(listIndex*3 + index);
    },
    nomalizeSong(song) {
      const {
        id,
        name,
        song: {
          mvid,
          artists,
          album: { blurPicUrl },
          duration
        }
      } = song
      return createSong({
        id,
        name,
        img: blurPicUrl,
        artists,
        duration,
        mvId: mvid
      })
    }
  },
  components: {
    SongCard
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: inline-block;
  width: 100%;
}
</style>