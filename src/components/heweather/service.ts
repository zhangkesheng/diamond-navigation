import request from 'umi-request';

export async function getIP(): Promise<any> {
  return request.get('http://localhost:8000/api/ip');
}

export async function getCityCode(location: string): Promise<any> {
  return request.get(
    `https://search.heweather.net/find?key=375b606e79ea460c99cd71b3795a8fd1&group=cn&lang=zh&location=${location}`,
  );
}

export async function getWeather(code: string): Promise<any> {
  return request.get(
    `https://widget-api.heweather.net/s6/plugin/sticker?key=375b606e79ea460c99cd71b3795a8fd1&location=${code}&lang=zh`,
  );
}
