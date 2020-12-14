import request from 'umi-request';

export default (c: string[]) => {
  return request.get('https://v1.hitokoto.cn', {
    params: {
      c: c,
      encode: 'json',
    },
  });
};
