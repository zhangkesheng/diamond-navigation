import { Effect, Reducer } from 'umi';
import { SearchPlatform } from '@/components/search';
import {
  AirNowCity,
  AirForecast,
  Now,
  DailyForecast,
  Alarm,
} from '../components/heweather/model';
import { getWeather, getIP, getCityCode } from '@/components/heweather/service';
import { Config, getLocConfig, setLocConfig } from '@/services/config';
import moment from 'moment';

export interface HomeConfig {
  mode?: string;
}

export interface HomeModelState {
  config: Config;
  weather: {
    city?: string;
    status?: string;
    air_now_city?: AirNowCity;
    air_forecast?: AirForecast[];
    now?: Now;
    daily_forecast?: DailyForecast[];
    alarm?: Alarm[];
  };
}

export interface HomeModelType {
  namespace: 'home';
  state: HomeModelState;
  effects: {
    load: Effect;
    getWeather: Effect;
    setActiveSearch: Effect;
    setCommon: Effect;
    setMode: Effect;
    setConfig: Effect;
    refreshBg: Effect;
  };
  reducers: {
    setState: Reducer<HomeModelState>;
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    config: {
      info: {},
      setting: {},
      searches: [],
      cats: [],
      commons: [],
    },
    weather: {},
  },
  effects: {
    *load(_, { call, put }) {
      const config: Config = yield call(getLocConfig);
      yield put({
        type: 'setState',
        payload: {
          config,
        },
      });
      yield put({
        type: 'getWeather',
      });
    },
    *getWeather(_, { call, put }) {
      // 获取本地ip
      // const ip = yield call(getIP)
      // console.log(ip)
      // 获取城市编码
      const city = '上海';
      const code = yield call(getCityCode, city);
      const resp = yield call(getWeather, code.HeWeather6[0].basic[0].cid);
      yield put({
        type: 'setState',
        payload: {
          weather: { ...resp, ...{ city: city } },
        },
      });
    },
    *setActiveSearch({ payload }, { call, put }) {
      const config: Config = yield call(getLocConfig);
      if (Object.keys(config).length == 0) {
        return;
      }
      config.searches?.map((v, i) => {
        v.active = false;
        if (i == payload.idx) v.active = true;
      });
      yield call(setLocConfig, config);
      yield put({
        type: 'setState',
        payload: {
          config,
        },
      });
    },
    *setCommon({ payload }, { call, put }) {
      const config: Config = yield call(getLocConfig);
      const commonMenus = config.commons || [];
      if (commonMenus?.findIndex(v => v.url == payload.item.url) > -1)
        commonMenus?.map(v => {
          if (v.url == payload.item.url)
            if (v.click) v.click++;
            else v.click = 1;
        });
      else {
        commonMenus.push(payload.item);
      }
      config.commons = commonMenus;

      yield call(setLocConfig, config);
      yield put({
        type: 'setState',
        payload: {
          config,
        },
      });
    },
    *setMode({ payload }, { call, put }) {
      const config: Config = yield call(getLocConfig);
      config.setting.mode = payload.mode;
      yield call(setLocConfig, config);
      yield put({
        type: 'setState',
        payload: {
          config,
        },
      });
    },
    *setConfig({ payload }, { call, put }) {
      yield call(setLocConfig, payload.config);
      yield put({
        type: 'setState',
        payload: {
          config: payload.config,
        },
      });
    },
    *refreshBg({ payload }, { call, put }) {
      const config: Config = yield call(getLocConfig);
      if (Object.keys(config).length == 0) {
        return;
      }

      const now = moment().format('YYYYMMDD');
      if (config.setting.bgDate == now) {
        return;
      }
      config.setting.bgDate = now;
      console.log(now, moment());

      yield call(setLocConfig, config);
      yield put({
        type: 'setState',
        payload: {
          config,
        },
      });
      window.location.reload();
    },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default HomeModel;
