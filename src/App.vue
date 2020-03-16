<template>
  <div id="app">
    <PC :data="data" />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import PC from '@/pages/pc.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('json-loader!yaml-loader!./data.yml');

export default Vue.extend({
  components: {
    PC,
  },
  data() {
    return {
      data,
    };
  },
  mounted() {
    document.title = this.data.title;
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #888;
}
</style>
