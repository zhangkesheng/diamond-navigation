import { defineConfig } from 'umi';

export default defineConfig({
  title: '和你的小窝',
  antd: {
    dark: true, // 开启暗色主题
    compact: false, // 开启紧凑主题
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layout/default',
      routes: [
        {
          path: '/',
          component: '@/pages/home/index',
        },
      ],
    },
  ],
});
