import config from './config';

const ActivePlatformIdxKey = 'PLATFORM_IDX';
const CommonItemsKey = 'COMMON_ITEMS';

export function load(): any {
  return config;
}

export function getActivePlatformIdx(): number {
  return Number.parseInt(localStorage.getItem(ActivePlatformIdxKey) || '0');
}

export function setActivePlatformIdx(idx: number) {
  console.log(idx);
  localStorage.setItem(ActivePlatformIdxKey, idx?.toString());
}

export function getCommonItems(): any {
  return JSON.parse(localStorage.getItem(CommonItemsKey) || '[]');
}

export function setCommonItems(v: any) {
  localStorage.setItem(CommonItemsKey, JSON.stringify(v));
}
