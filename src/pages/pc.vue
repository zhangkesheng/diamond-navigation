<template lang="pug">
div.container
  Search.search(:platform="data.searchEngine")
  Box.box(:boxes="data.boxes")
</template>

<script lang="ts">
import Vue from 'vue';
import Search from '../components/search.vue';
import Box from '../components/box.vue';


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
  },
});
</script>

<style lang="scss" scoped>
.search {
  width: 642px;
  padding-top: 200px;
  margin: 0 auto;
}
.box{
  width: 895px;
  margin: 100px auto 0;
}
</style>
