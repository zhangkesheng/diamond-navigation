<template lang="pug">
div
  span.search-area
    span.platform.addon
      icon-svg(v-if="platform[searchPlatformIdx].icon", :type="platform[searchPlatformIdx].icon")
      span(v-else) {{platform[searchPlatformIdx].name}}
    input.search-input(placeholder='使用Tab切换搜索平台', v-model="keyword",
      @keydown.tab.prevent="changePlatform",
      @keydown.enter.prevent="search")
    span.btn.addon(@click="search")
      icon-svg(type="search" style="margin-right: 4px;")
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
        window.open(`${this.platform[this.searchPlatformIdx].url || ''}${this.keyword}`, '_blank');
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
  color: rgba(0, 0, 0, 0.65);
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
}
.addon {
  position: relative;
  padding: 0 11px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: normal;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  width: 1px;
  white-space: nowrap;
  vertical-align: middle;
  display: table-cell;
}
.platform {
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 30px;
  padding: 3px;
  width: 39px;
  overflow: hidden;
  svg {
    height: 100%;
    width: 100%;
  }
}
.btn {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
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
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
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
}
</style>
