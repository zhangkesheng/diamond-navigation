import React, { useEffect } from 'react';
import { ConnectProps, connect, HomeConfig } from 'umi';
import Search from '@/components/search';
import Box from '@/components/box';
import SimplerBox from '@/components/simpler';
import Edit from '@/components/edit';
import { Layout } from 'antd';
import { ConnectState } from '@/models/connect';
import Weather from '@/components/heweather';
import { AirNowCity, AirForecast, Now, DailyForecast } from './heweather';
import { Alarm } from '@/components/heweather/model';
import { Cat, SearchEngine, Item, Config } from '@/services/config';
import moment from 'moment';
import Account from '@/components/account';
import { Hitokoto } from '@/models/home';
import Time from '@/components/time';

interface HomeProps extends ConnectProps {
  config: Config;
  weather: {
    status?: string;
    air_now_city?: AirNowCity;
    air_forecast?: AirForecast[];
    now?: Now;
    daily_forecast?: DailyForecast[];
    alarm?: Alarm[];
  };
  user?: {
    id_token?: string;
    access_token?: string;
    info?: any;
  };
  hitokoto?: Hitokoto;
}

const Home: React.FC<HomeProps> = props => {
  const { config, weather, user, hitokoto, dispatch } = props;

  useEffect(() => {
    if (dispatch) {
      // 加载配置
      dispatch({
        type: 'home/load',
      });

      // 每隔1h更新天气数据
      setInterval(() => {
        if (dispatch) {
          dispatch({
            type: 'home/getWeather',
          });
        }
      }, 3600000);
    }
  }, []);

  const searchEngineChangeHandler = (idx: number) => {
    if (dispatch)
      dispatch({
        type: 'home/setActiveSearch',
        payload: {
          config,
          idx: idx == config.searches.length - 1 ? 0 : idx + 1,
        },
      });
  };

  const itemClickHandler = (s: Item) => {
    if (dispatch)
      dispatch({
        type: 'home/setCommon',
        payload: {
          item: s,
        },
      });
    window.open(s.url, '_blank');
  };

  const modeChange = (s: string) => {
    if (dispatch)
      dispatch({
        type: 'home/setMode',
        payload: {
          mode: s,
        },
      });
  };

  const onConfigChange = (c: Config) => {
    if (c.info.title != config.info.title) {
      document.title = c.info.title || '';
    }
    if (dispatch)
      dispatch({
        type: 'home/setConfig',
        payload: {
          config: c,
        },
      });
  };

  const menuChange = (menus: Cat[]) => {
    if (dispatch)
      dispatch({
        type: 'home/setConfig',
        payload: {
          config: { ...config, menus },
        },
      });
  };

  const logout = () => {
    if (dispatch)
      dispatch({
        type: 'global/logout',
      });
  };

  const changeSlogan = (slogan: string) => {
    if (dispatch)
      dispatch({
        type: 'global/updateUser',
        payload: {
          slogan,
        },
      });
  };

  return (
    <div
      style={{
        paddingTop: 200,
        minHeight: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundImage: `url(https://image.bestzks.com/${config.setting
          .bgDate || moment().format('YYYYMMDD')})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 100,
        }}
      >
        <div style={{ marginTop: 16 }}>
          <Edit config={config} onConfigChange={onConfigChange}></Edit>
        </div>
        <div style={{ marginTop: 16 }}>
          <Weather weather={weather} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Time />
        </div>
      </div>

      <Layout.Content
        style={{ width: 624, margin: '0 auto', background: '#141414' }}
      >
        <Search
          placeholder={`${hitokoto?.hitokoto}  -- ${hitokoto?.from}`}
          searches={config.searches}
          platformChangeHandler={searchEngineChangeHandler}
        />
      </Layout.Content>
      <Layout.Content
        style={{ height: 500, width: 800, margin: '60px auto 0' }}
      >
        {config.setting.mode == 'simpler' &&
          config.commons &&
          config.commons.length > 0 && (
            <SimplerBox
              commonMenus={config.commons}
              shortCutClickHandler={itemClickHandler}
              modeChange={modeChange}
            />
          )}
        {(config.setting.mode != 'simpler' ||
          !config.commons ||
          config.commons.length == 0) && (
          <Box
            menus={config.cats}
            commonMenus={config.commons}
            itemClickHandler={itemClickHandler}
            modeChange={modeChange}
            menuChange={menuChange}
          />
        )}
      </Layout.Content>
    </div>
  );
};

export default connect(
  ({
    home: { config, weather, hitokoto },
    global: { user },
  }: ConnectState) => ({
    config,
    weather,
    user,
    hitokoto,
  }),
)(Home);
