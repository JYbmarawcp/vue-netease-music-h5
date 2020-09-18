<template>
  <transition name="slide">
    <div class="search-detail">
      <div class="list-fixed">
        <Icon
          @click.native="back"
          class="back" 
          type="back" 
          color="grey" 
        />
        <form action="#" method="get" class="m-input" @click="inputFocus">
          <div class="inputcover">
            <Icon type="search" color="shallow" class="u-sech" />
            <input
              id="reinputs"
              @keypress.enter="onEnterPress"
              type="search"
              autocomplete="off"
              v-model.trim="keyValue"
              class="input-box"
            />
          </div>
        </form>
      </div>
      <div class="songs-wrap">
        <Scroll v-if="songs.length">
          <Songlist
            class="songlist"
            :songs="songs"
            :orderShow="false"
          />
        </Scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { getSearch } from "@/api"
import { createSong } from "@/utils"
import Songlist from "@/components/song-list"

export default {
  props: {
    limit: {
      type: Number,
      default: 30
    },
    keywords: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      keyValue: "",
      songs: []
    }
  },
  created () {
    this.keyValue = this.keywords
    this.onPageChange()
  },
  methods: {
    async onPageChange(){
      const { result: { songs } } = await getSearch({ 
        limit: this.limit,
        keywords: this.keywords 
      })
      this.songs = songs.map(song => {
        const { id, name, mvid, alias, artists, album, duration } = song
        return createSong({
          id,
          name,
          mvId: mvid,
          alias,
          artists,
          albumId: album.id,
          albumName: album.name,
          duration
        })
      })
    },
    inputFocus() {
      document.getElementById("reinputs").focus();
    },
    back() {
      this.$router.push('/search')
    },
    onEnterPress() {
      if (this.keyValue) {
        this.$router.push(`/search/${this.keyValue}`)
      }
    },
  },
  watch: {
    keywords: {
      handler() {
        this.onPageChange()
      },
    }
  },
  components: {
    Songlist
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0)
}

.search-detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: #ffffff;
  overflow: hidden;

  .list-fixed {
    display: flex;
    height: 40px;
    align-items: center;

    .back {
      padding: 10px 8px;
      width: 40px;
    }
    .m-input {
      flex: 1;
      margin-right: 40px;
      .inputcover {
        position: relative;
        width: 100%;
        height: 30px;
        padding: 0 30px;
        box-sizing: border-box;
        background: #ebecec;
        border-radius: 30px;

        .input-box {
          width: 100%;
          height: 30px;
          line-height: 18px;
          background: rgba(0, 0, 0, 0);
          font-size: $font-size;
          color: #333;
          border-radius: 0;
          border: 0;
          outline: 0;
        }
        .u-sech {
          position: absolute;
          left: 0;
          top: 4px;
          margin: 0 8px;
          vertical-align: middle;
        }
      }
    }
  }

  .songs-wrap {
    position: relative;
    height: calc(100vh - 40px);

    .songlist {
      background: #fcfcfd;
    }
  }
}
</style>