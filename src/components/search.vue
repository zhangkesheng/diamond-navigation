<template lang="pug">
div
  span.search-area
    span.platform.addon
      logo-icon.logo(v-if="platform[searchPlatformIdx].icon",
        :name="platform[searchPlatformIdx].icon")
      span(v-else) {{platform[searchPlatformIdx].name}}
    input.search-input(placeholder='使用Tab切换搜索平台', v-model="keyword",
      @keydown.tab.prevent="changePlatform",
      @keydown.enter.prevent="search")
    span.clear(v-show="keyword.length>0" @click="clear") +
    span.btn.addon(@click="search")
      logo-icon(name="#search" style="margin-right: 4px;")
      span {{platform[searchPlatformIdx].name || 'Search'}}
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

export default Vue.extend({
  props: {
    platform: {
      type: Object,
    },
  },
  name: 'search',
  data() {
    return {
      keyword: '',
    };
  },
  computed: {
    ...mapState(['searchPlatformIdx']),
  },
  methods: {
    ...mapMutations(['updatePlatform']),
    search() {
      if (!this.keyword) {
        return;
      }
      if (this.platform[this.searchPlatformIdx]) {
        window.open(
          `${this.platform[this.searchPlatformIdx].url || ''}${this.keyword}`,
          '_blank',
        );
      }
    },
    changePlatform(e: any) {
      e.preventDefault();
      let idx = this.searchPlatformIdx;
      if (idx + 1 === this.platform.length) {
        idx = 0;
      } else {
        idx += 1;
      }
      this.updatePlatform(idx);
    },
    clear() {
      this.keyword = '';
    },
  },
});
</script>

<style lang="scss" scoped>
.search-area {
  display: inline-block;
  width: 100%;
  text-align: start;
  vertical-align: top;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: start;
  border: 1px solid #434343;
  @include fontColor();
  @include borderColor();
  @include bgColor();
}
.addon {
  position: relative;
  padding: 0 11px;
  font-weight: normal;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  border: 1px solid #434343;
  border-radius: 4px;
  transition: all 0.3s;
  width: 1px;
  white-space: nowrap;
  vertical-align: middle;
  display: table-cell;
  @include fontColor();
  @include borderColor();
  @include bgColor();
}
.platform {
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 30px;
  padding: 3px;
  width: 39px;
  overflow: hidden;
  @include fontColor();
  .logo {
    font-size: 32px;
    @include fontColor();
  }
}
.btn {
  width: 70px;
  overflow: hidden;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  @include fontColor();
  @include borderColor();
  @include bgColor();
}
.btn:hover {
  cursor: pointer;
}
.search-input {
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #434343;
  border-radius: 0;
  transition: all 0.3s;
  float: left;
  width: 100%;
  margin-bottom: 0;
  text-align: inherit;
  display: table-cell;
  height: 40px;
  padding: 6px 11px;
  font-size: 16px;
  @include fontColor();
  @include borderColor();
  @include bgColor();
}
.clear {
  position: absolute;
  display: inline-block;
  line-height: 1em;
  z-index: 999;
  width: 14px;
  height: 14px;
  overflow: hidden;
  text-align: center;
  border-radius: 7px;
  transform: rotate(45deg);
  top: 35%;
  right: 100px;
  &:hover {
    cursor: pointer;
  }
  @include fontColor();
  @include borderColor();
  @include mainBg();
}
</style>
