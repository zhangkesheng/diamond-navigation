<template lang="pug">
div.container
  div.empty
  div.weather-box
    Weather
  Search.search(:platform="data.searchEngine")
  Box.box(:boxes="data.boxes")
</template>

<script lang="ts">
import Vue from 'vue';
import Search from '../components/search.vue';
import Box from '../components/box.vue';
import Weather from '../components/weather.vue';

export default Vue.extend({
  props: {
    data: {
      type: Object,
    },
  },
  name: 'pc',
  components: {
    Search,
    Box,
    Weather,
  },
});
</script>

<style lang="scss" scoped>
.empty{
  height: 160px;
}
.search {
  width: 642px;
  margin: 0 auto 0;
}
.box {
  width: 895px;
  margin: 100px auto 0;
}
.weather-box {
  width: 642px;
  margin: 0 auto;
  padding-bottom: 10px;
  &::after{
    clear: both;
    display: table;
    content: '';
  }
  .weather{
    float: right;
  }
}
</style>
