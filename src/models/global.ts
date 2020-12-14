import { Effect, Reducer } from 'umi';
import config, { getLocConfig, setLocConfig } from '@/services/config';
import {
  get,
  getLocIdToken,
  getLocToken,
  login,
  logout,
  update,
} from '@/services/user';

export interface IndexModelState {
  config: {
    title?: string;
  };
  user?: {
    id_token?: string;
    access_token?: string;
    info?: any;
  };
}

export interface HomeModelType {
  namespace: 'global';
  state: IndexModelState;
  effects: {
    init: Effect;
    login: Effect;
    logout: Effect;
    getUser: Effect;
    updateUser: Effect;
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

      let token = yield call(getLocToken);
      let idToken = yield call(getLocIdToken);
      yield put({
        type: 'setState',
        payload: {
          config: {
            title: locConfig.info.title,
          },
          user: {
            access_token: token,
            id_token: idToken,
          },
        },
      });
    },
    *login({ payload, callback }, { call, put }) {
      try {
        const resp = yield call(login, payload.clientId, payload.code);
        yield put({
          type: 'setState',
          payload: {
            user: resp,
          },
        });
      } catch (e) {
        console.log(e);
      }
      yield call(callback);
    },
    *logout(_, { call, put }) {
      yield call(logout);
      yield put({
        type: 'setState',
        payload: {
          user: {},
        },
      });
    },
    *getUser(_, { call, put, select }) {
      const resp = yield call(get);
      const user = yield select((state: any) => state.global.user);
      console.log(user);
      yield put({
        type: 'setState',
        payload: {
          user: {
            ...user,
            ...{
              info: resp,
            },
          },
        },
      });
    },
    *updateUser({ payload }, { call, put, select }) {
      const resp = yield call(update, payload);
      const user = yield select((state: any) => state.global.user);
      yield put({
        type: 'setState',
        payload: {
          user: {
            ...user,
            ...{
              info: resp,
            },
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
