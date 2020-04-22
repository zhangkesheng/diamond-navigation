<template lang="pug">
  div.weather(@mouseenter="showDaily" @mouseleave="showDaily")
    div.simple.right.dark
      span {{weather.now.tmp}} °C
      span.city 上海
      span.txt
        img.icon(:src="getWeatherImg(weather.now.cond_code)")
      span.air {{weather.air_now_city.qlty}}
    div.daily.dark(v-show="daily")
      div.today
      //- div.rain {{weather.rain.txt||''}}
      div.list
        div 未来三天预报:
        div.item(v-for="(item,idx) in weather.daily_forecast" :key="idx")
          span {{item.date}}
          span
            img.icon(:src="getWeatherImg(item.cond_code_d)")
          span {{item.tmp_min}}°C/{{item.tmp_max}}°C
          span {{weather.air_forecast[idx].qlty}}
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import widget from '@/services/weather';

export default Vue.extend({
  data() {
    return {
      weather: {
        now: {},
        // eslint-disable-next-line @typescript-eslint/camelcase
        air_now_city: {},
      },
      daily: false,
    };
  },
  methods: {
    hfNow() {
      widget().then((res: any) => {
        this.weather = res.data;
      });
    },
    getWeatherImg(code: string) {
      return `https://cdn.heweather.com/img/plugin/190516/icon/c/${code}d.png`;
    },
    today() {
      return moment().format('MM-DD');
    },
    showDaily() {
      this.daily = !this.daily;
    },
  },
  mounted() {
    this.hfNow();
  },
});
</script>

<style lang="scss" scoped>
.weather {
  .dark {
    background-color: #313a44;
  }
  .right {
    text-align: right;
  }
  .simple {
    width: 145px;
    padding: 10px 10px 10px;
    height: 21px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
    .date {
      position: absolute;
      font-size: 12px;
      padding: 0;
      margin-top: -12px;
      margin-left: -8px;
    }
    span {
      padding-left: 8px;
    }
  }
  .daily {
    z-index: 999;
    position: absolute;
    padding: 10px;
    width: 200px;
    border-radius: 5px;
    font-size: 12px;
    .rain {
      padding-bottom: 5px;
      border-bottom: 1px solid #fff;
      @include borderColor1();
    }
    .list {
      margin-top: 3px;
      span {
        padding: 0 5px;
      }
      .item{
        margin-top: 5px;
      }
    }
  }
  .icon {
    width: 22px;
    height: 22px;
    vertical-align: middle;
    margin-top: -3px;
  }
}
</style>
