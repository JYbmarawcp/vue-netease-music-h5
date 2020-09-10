<template>
  <div class="search">
    <form action="#" method="get" class="m-input" @click="inputFocus">
      <div class="inputcover">
        <Icon type="search" color="shallow" class="u-sech" />
        <input
          id="inputs"
          @input="onInput(searchKeyword)"
          @keypress.enter="onEnterPress"
          type="search"
          autocomplete="off"
          v-model.trim="searchKeyword"
          class="input-box"
          :placeholder="searchDefault"
        />
      </div>
    </form>
    <Scroll
      v-if="searchHots.length"
      ref="searchroll"
    >
      <div 
        class="suggest-wrap"
        v-if="suggestShow"
      >
        <ul>
          <li class="recomitem">
            <span class="keyword">{{ "搜索“" + searchKeyword + "”"}}</span>
          </li>
          <li
            @click="onClickSuggest(item.keyword)"
            v-for="(item, index) in suggest"
            :key="index"
            class="recomitem">
            <Icon type="search" color="shallow" class="u-sech" />
            <span>{{ item.keyword }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="history" v-if="searchHistorys.length">

        </div>
        <p class="title">热搜榜</p>
        <div class="hotkey-wrap">
          <HotSearch
            @click.native="onClickHot(hot.searchWord)"
            v-for="(hot, index) in searchHots"
            :key="hot.hot"
            :order="index+1"
            :name="hot.searchWord"
            :icon="hot.iconUrl"
            :desc="hot.content"
          />
        </div>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import storage from "good-storage"
import { 
  getSearchHot, 
  getSearchDefault, 
  getSearchSuggest
} from "@/api"
import { debounce } from "@/utils"
import HotSearch from "@/components/hot-search"

const SEARCH_HISTORY_KEY = "__search_history__"
export default {
  async created () {
    const { data : { showKeyword } }= await getSearchDefault()
    this.searchDefault = showKeyword
    const { data } = await getSearchHot()
    this.searchHots = data
  },
  data () {
    return {
      searchDefault: "",
      searchKeyword: "",
      searchHots: [],
      suggest: {},
      searchHistorys: storage.get(SEARCH_HISTORY_KEY, [])
    }
  },
  methods: {
    inputFocus() {
      document.getElementById("inputs").focus();
    },
    onInput: debounce(function(value) {
      if (!value.trim()) return
      getSearchSuggest(value).then(({result}) => {
        this.suggest = result.allMatch
      })
    }, 500),
    onEnterPress() {
      if (this.searchKeyword) {
        this.$router.push(`/search/${this.searchKeyword}`)
      }
    },
    onClickSuggest(suggest) {
      if (suggest) {
        this.$router.push(`/search/${suggest}`)
      }
    },
    onClickHot(searchWord) {
      this.$router.push(`/search/${searchWord}`)
    }
  },
  computed: {
    suggestShow() {
      return this.searchKeyword
    }
  },
  components: {
    HotSearch
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: calc(100vh - 145px);
  position: relative;

  .m-input {
    padding: 15px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

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

  .suggest-wrap {
    margin: 0 auto;

    .recomitem {
      display: flex;
      align-items: center;
      height: 45px;
      padding-left: 10px;

      i {
        padding-right: 7px;
      }
      span {
        flex: 1;
        padding-right: 10px;
        line-height: 45px;
        color: #333;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
      }
      .keyword {
        color: $blue;
      }
    }
  }

  .title {
    font-size: $font-size;
    font-weight: $font-weight-bold;
    padding: 10px;
  }
  .hotkey-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>