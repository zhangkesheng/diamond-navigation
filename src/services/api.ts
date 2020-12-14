import { decode } from '@/utils/jwt';
import request, { extend } from 'umi-request';
import moment from 'moment';
import _ from 'lodash';
import { message } from 'antd';

const apiHost = process.env.API_HOST || 'http://localhost:8000/test/';

const initReq = () => {
  return extend({
    prefix: apiHost,
    timeout: 3000,
    errorHandler: e => {
      console.log(e);
      if (e.data && e.data.Message)
        message.error(e.data.Message || '有点意外发生, 请重试');
    },
  });
};

export const baseApi = initReq();

const api = initReq();
// TODO: 并发处理
api.interceptors.request.use(
  (url, options) => {
    let token = localStorage.getItem('token');
    if (!token) {
      console.log(url);
      throw new Error('Unauthorize');
    }

    const info = decode(token);
    if (!info) {
      throw new Error('Token error');
    }
    // expired, clear token
    if (moment.unix(info.exp) < moment()) {
      localStorage.removeItem('token');
      throw new Error('Expired');
    }

    // refresh token
    if (moment().add(60, 'second') > moment.unix(info.exp)) {
      baseApi.post('account/refresh').then(res => {
        localStorage.setItem('token', res.access_token);
        token = res.access_token;
      });
    }

    return {
      url: `${url}`,
      options: {
        ...options,
        ...{
          headers: {
            ...options.headers,
            ...{
              Authorization: `Bearer ${token}`,
            },
          },
        },
      },
    };
  },
  { global: false },
);

// api.use(async (ctx, next) => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return {};
//   }

//   const info = decode(token);
//   if (!info) {
//     return {};
//   }
//   // expired, clear token
//   if (moment.unix(info.exp) < moment()) {
//     console.log('expired');
//     // localStorage.removeItem('token');
//     throw new Error('Expired');
//   }

//   // refresh token
//   if (moment().add(60, 'second') > moment.unix(info.exp)) {
//     await baseApi.post('account/refresh');
//   }

//   await next();
// });

export default api;
