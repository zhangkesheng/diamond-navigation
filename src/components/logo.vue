<template>
  <span class="logo-content">
    <svg class="logo-icon" v-if="iconType==='svg'" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
    <img class="logo-icon" v-if="iconType==='img'" :src="iconName" />
  </span>
</template>

<script>
export default {
  name: 'logo-icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      type: 'svg',
    };
  },
  computed: {
    iconName() {
      return `${this.name}`;
    },
    iconType() {
      if (this.name.indexOf('http') === 0) {
        return 'img';
      }
      return 'svg';
    },
  },
};
</script>

<style>
.logo-content{
  display: inline-block;
}
.logo-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
