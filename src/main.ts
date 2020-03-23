import Vue from 'vue';
import icon from '@/components/logo.vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';

Vue.config.productionTip = false;

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);

Vue.component('logo-icon', icon);


new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
