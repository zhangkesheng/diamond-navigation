import { Effect, Reducer } from 'umi';

export interface IndexModelState {
  config: {};
}

export interface HomeModelType {
  namespace: 'global';
  state: IndexModelState;
  effects: {
    init: Effect;
  };
  reducers: {};
  subscriptions: {};
}

const IndexModel: HomeModelType = {
  namespace: 'global',
  state: {
    config: {},
  },
  effects: {
    *init(_, { call, put }) {},
  },
  reducers: {},
  subscriptions: {},
};

export default IndexModel;
