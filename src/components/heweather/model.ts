export interface AirNowCity {
  aqi: string;
  qlty: string;
}

export interface AirForecast {
  aqi: string;
  date: string;
  qlty: string;
}

export interface Now {
  cond_code: string;
  cond_txt: string;
  tmp: string;
}

export interface DailyForecast {
  cond_code_d: string;
  cond_code_n: string;
  cond_txt_d: string;
  cond_txt_n: string;
  date: string;
  mr: string;
  ms: string;
  sr: string;
  ss: string;
  tmp_max: string;
  tmp_min: string;
  qlty?: string;
}

export interface Rain {
  txt: string;
}

export interface RootObject {
  status: string;
  air_now_city: AirNowCity;
  air_forecast: AirForecast[];
  now: Now;
  daily_forecast: DailyForecast[];
  rain: Rain;
}

export interface Alarm {
  level: string;
  type: string;
}
