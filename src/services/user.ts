import { decode } from '@/utils/jwt';
import api, { baseApi } from './api';

export const login = (clientId: string, code: string) => {
  console.log(baseApi);
  return new Promise((resolve, reject) => {
    baseApi
      .post(`account/client/${clientId}/authorize`, {
        data: {
          code: code,
        },
      })
      .then(res => {
        setToken(res.access_token);
        setIdToken(res.id_token);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const logout = () => {
  return new Promise(resolve => {
    api.get(`account/logout`).then(() => {
      clear();
      resolve();
    });
  });
};

export const get = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return reject('token not found');
    }
    const info = decode(token);

    api
      .post('api/curd/v1/r/user', {
        data: {
          cond: {
            sub: info.sub || '',
          },
          filed_mask: {
            paths: ['*'],
          },
        },
      })
      .then(res => {
        if (res && res.data && res.data[0] && res.data[0].map) {
          return resolve(res.data[0].map);
        }
        resolve({});
      })
      .catch(e => reject(e));
  });
};

export const update = (params: any) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return reject('token not found');
    }
    const info = decode(token);

    api
      .put('api/curd/v1/user', {
        data: {
          table: {
            data: {
              slogan: params.slogan,
            },
          },
          cond: {
            sub: info.sub || '',
          },
          filed_mask: {
            paths: ['sub'],
          },
        },
      })
      .then(res => {
        if (res.data && res.data[0] && res.data[0].map) {
          return resolve(res.data[0].map);
        }
        resolve({});
      })
      .catch(e => reject(e));
  });
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getLocToken = () => {
  return localStorage.getItem('token') || '';
};

export const setIdToken = (token: string) => {
  localStorage.setItem('id_token', token);
};

export const getLocIdToken = () => {
  return localStorage.getItem('id_token') || '';
};

export const clear = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id_token');
};
