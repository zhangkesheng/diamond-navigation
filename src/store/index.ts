/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchPlatformIdx: Number(localStorage.getItem('pIdx') || '0'),
    frequentlyList: JSON.parse(localStorage.getItem('fList') || '[]'),
    theme: localStorage.getItem('theme') || 'dark',
  },
  mutations: {
    updatePlatform(state: any, idx: number) {
      state.searchPlatformIdx = idx;
      localStorage.setItem('pIdx', String(idx));
    },
    updateFrequently(state: any, item: any) {
      if (state.frequentlyList.filter((v: any) => v.item.title === item.title).length > 0) {
        const list = state.frequentlyList.map((v: any): any => {
          const d = v;
          if (d.item.title === item.title) {
            d.cnt += 1;
          }
          return d;
        });
        state.frequentlyList = list;
      } else {
        state.frequentlyList.push({ item, cnt: 1 });
      }
      state.frequentlyList.sort((p: any, n: any) => n.cnt - p.cnt);
      localStorage.setItem('fList', JSON.stringify(state.frequentlyList));
    },
    updateTheme(state: any, theme: string) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
  },
  actions: {
  },
  modules: {
  },
});
