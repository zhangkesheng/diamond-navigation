import { Effect, Reducer } from 'umi';
import config, { getLocConfig, setLocConfig } from '@/services/config';

export interface IndexModelState {
  config: {
    title?: string;
  };
}

export interface HomeModelType {
  namespace: 'global';
  state: IndexModelState;
  effects: {
    init: Effect;
  };
  reducers: {
    setState: Reducer<IndexModelState>;
  };
}

const IndexModel: HomeModelType = {
  namespace: 'global',
  state: {
    config: {
      title: '',
    },
  },
  effects: {
    *init(_, { call, put }) {
      // Check config, set default config when config empty
      let locConfig = yield call(getLocConfig);
      if (Object.keys(locConfig).length == 0) {
        locConfig = config;
        yield call(setLocConfig, config);
      }
      yield put({
        type: 'setState',
        payload: {
          config: {
            title: locConfig.info.title,
          },
        },
      });
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

export default IndexModel;
