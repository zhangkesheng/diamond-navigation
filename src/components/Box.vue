<template lang="pug">
div.boxes
  ul.menu
    li(v-for="(item,index) in boxes" :key="index",
      :class="index===activeIdx?'active':''"
      @click="selectItem(index)")
      icon-svg(v-if="item.icon", :type="item.icon")
      span {{item.category}} ({{item.items.length}})
  div#box-content.content
    div.top(@click="top")
      icon-svg(type="top")
    div.box(v-if="frequentlyList.length>0")
      div.box-title 常用
      div.items
        div(v-for="(v,index) in frequentlyList" :key="index")
          div.frequent.item(@click="goto(v.item)")
            div.title
              icon-svg(v-if="v.item.logo", :type="v.item.logo")
              span {{v.item.title}}
    div.box(v-for="(box,index) in boxes" :key="index", :id="'idx_'+index")
      div.box-title
        icon-svg(v-if="box.icon", :type="box.icon")
        span {{box.category}}
      div.items
        div(v-for="(item,index) in box.items" :key="index")
          div.item(@click="goto(item)")
            div.title
              icon-svg(v-if="item.logo", :type="item.logo")
              //- img(:src="'chrome-search://ntpicon/?size=48@1.000000x&url='+item.href")
              span {{item.title}}
            div.desc
              span {{item.desc}}
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

export default Vue.extend({
  props: {
    boxes: Array,
  },
  computed: {
    ...mapState(['frequentlyList']),
  },
  data() {
    return {
      activeIdx: 0,
    };
  },
  methods: {
    ...mapMutations(['updateFrequently']),
    selectItem(idx: number) {
      if (this.activeIdx === idx) return;
      this.activeIdx = idx;
      const item = document.getElementById(`idx_${idx}`);
      if (item) {
        this.scrollTo(item.offsetTop);
      }
    },
    top() {
      this.scrollTo(0);
    },
    scrollTo(total: number) {
      const box = document.getElementById('box-content');
      if (box) {
        let times = 20;
        const step = (total - box.scrollTop) / times;
        const timer = setInterval(() => {
          times -= 1;
          if (times >= 0) {
            box.scrollTop += step;
          } else {
            // 修正一下误差
            box.scrollTop = total;
            clearInterval(timer);
          }
        }, 20);
      }
    },
    goto(item: any) {
      this.updateFrequently(item);
      window.open(item.href, '_blank');
    },
  },
});
</script>

<style lang="scss" scoped>
.top {
  position: absolute;
  width: 35px;
  height: 35px;
  color: #888;
  z-index: 999;
  bottom: 10px;
  right: 10px;
  &:hover{
    cursor: pointer;
  }
  svg{
    height: 100%;
    width: 100%;
  }
}
.boxes {
  border: 1px solid #e9e9e9;
  background: #ecebed;
  position: relative;
  ul.menu {
    position: absolute;
    width: 150px;
    padding: 0;
    margin-top: 0;
    height: 100%;
    background-color: #babbbe;
    li {
      list-style: none;
      padding: 16px 0 16px 16px;
      &.active {
        background-color: #ecebed;
      }
      &:hover {
        cursor: pointer;
      }
      svg {
        margin-right: 5px;
      }
    }
  }
  .content {
    margin-left: 150px;
    height: 500px;
    overflow-y: scroll;
    padding: 8px 16px 0;
    &::-webkit-scrollbar {
      width: 8px;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
    .box {
      padding-bottom: 16px;
      border-bottom: 1px solid #e2e2e2e6;
      &:after {
        clear: both;
        display: table;
        content: " ";
      }
      .box-title {
        padding: 8px 0;
        color: #000;
        svg {
          margin-right: 5px;
        }
      }
      .items {
        padding-left: 11px;
        &:after {
          clear: both;
          display: table;
          content: " ";
        }
        .item {
          height: 86px;
          overflow: hidden;
          color: #333;
          width: 30%;
          border: 1px solid #e4ecf3;
          box-shadow: 1px 2px 3px #f2f6f8;
          border-radius: 6px;
          padding: 10px 0;
          min-width: 180px;
          margin: 22px 0 0 2.1%;
          float: left;
          transition: all 0.3s;
          background-color: #fff;
          &:hover {
            cursor: pointer;
          }
          .title {
            padding: 0 10px 10px;
            border-bottom: 1px solid #e4ecf3;
            svg {
              margin-right: 5px;
            }
          }
          .desc {
            font-size: 12px;
            padding: 10px 10px 0;
            height: 42px;
            overflow-y: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
          }
        }
        .frequent.item {
          height: auto;
          width: 20%;
          min-width: 100px;
          .title {
            border: none;
            padding-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
