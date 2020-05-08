import { Effect, Reducer } from 'umi';
import { SearchPlatform } from '@/components/search';
import { BoxItem } from '@/components/box';
import {
  load,
  getActivePlatformIdx,
  setActivePlatformIdx,
  setCommonItems,
  getCommonItems,
} from '@/services/home';
import {
  AirNowCity,
  AirForecast,
  Now,
  DailyForecast,
  Alarm,
} from '../components/heweather/model';
import { getWeather, getIP, getCityCode } from '@/components/heweather/service';

export interface CommonItem {
  catIdx: number;
  itemIdx: number;
  click: number;
}

export interface HomeConfig {
  activePlatformIdx: number;
  commonItems?: CommonItem[];
}

export interface HomeModelState {
  config: HomeConfig;
  platforms: SearchPlatform[];
  boxItems: BoxItem[];
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
    setActivePlatform: Effect;
    setCommon: Effect;
  };
  reducers: {
    init: Reducer<HomeModelState>;
    setWeather: Reducer<HomeModelState>;
    activePlatform: Reducer<HomeModelState>;
    common: Reducer<HomeModelState>;
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    config: {
      activePlatformIdx: 0,
    },
    platforms: [],
    boxItems: [],
    weather: {},
  },
  effects: {
    *load(_, { call, put }) {
      const activePlatformIdx = yield call(getActivePlatformIdx);
      const commonItems = yield call(getCommonItems);
      const d = yield call(load);
      yield put({
        type: 'init',
        payload: {
          config: {
            activePlatformIdx: activePlatformIdx,
            commonItems: commonItems,
          },
          platforms: d.searchEngine,
          boxItems: d.boxes,
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
        type: 'setWeather',
        payload: {
          weather: { ...resp, ...{ city: city } },
        },
      });
    },
    *setActivePlatform({ payload }, { call, put }) {
      console.log(payload);
      yield call(setActivePlatformIdx, payload.idx);
      yield put({
        type: 'activePlatform',
        payload: {
          config: {
            // commonItems: payload.config.commonItems,
            activePlatformIdx: payload.idx,
          },
        },
      });
    },
    *setCommon({ payload }, { call, put }) {
      const config: HomeConfig = payload.config;
      const commonItems = config.commonItems;
      if (!commonItems) {
        return;
      }
      const idx = commonItems.findIndex(
        v => v.catIdx == payload.catIdx && v.itemIdx == payload.itemIdx,
      );
      if (idx < 0) {
        commonItems?.push({
          catIdx: payload.catIdx,
          itemIdx: payload.itemIdx,
          click: 1,
        });
      } else {
        commonItems && commonItems[idx].click++;
      }
      setCommonItems(commonItems);
      yield put({
        type: 'common',
        payload: {
          config: { activePlatformIdx: config.activePlatformIdx, commonItems },
        },
      });
    },
  },
  reducers: {
    init(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setWeather(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    activePlatform(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    common(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default HomeModel;
