import React, { useEffect } from 'react';
import { ConnectProps, connect, HomeConfig } from 'umi';
import Search from '@/components/search';
import Box from '@/components/box';
import SimplerBox from '@/components/simpler';
import Edit from '@/components/edit';
import { Layout, Row, Col, Affix, Avatar, Drawer } from 'antd';
import { ConnectState } from '@/models/connect';
import Weather from '@/components/heweather';
import { AirNowCity, AirForecast, Now, DailyForecast } from './heweather';
import { Alarm } from '@/components/heweather/model';
import { Cat, SearchEngine, Item, Config } from '@/services/config';
import moment from 'moment';

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
}

const Home: React.FC<HomeProps> = props => {
  const { config, weather, dispatch } = props;

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

  return (
    <div
      style={{
        paddingTop: 200,
        minHeight: '100%',
        height: '100%',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundImage: `url(https://image.bestzks.com/${config.setting
          .bgDate || moment().format('YYYYMMDD')})`,
      }}
    >
      <Edit config={config} onConfigChange={onConfigChange}></Edit>
      <Layout.Content
        style={{ width: 624, margin: '0 auto', background: '#141414' }}
      >
        <Search
          searches={config.searches}
          platformChangeHandler={searchEngineChangeHandler}
        />
      </Layout.Content>
      <Layout.Content style={{ width: 800, margin: '60px auto 0' }}>
        <Row style={{ marginBottom: 3 }}>
          <Col span={24}>
            <div
              style={{
                float: 'right',
                background: '#141414',
                border: '1px solid #434343',
                borderRadius: '5px',
              }}
            >
              <Weather weather={weather} />
            </div>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Content style={{ height: 500, width: 800, margin: '0 auto 0' }}>
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

// TODO: state的结构很奇怪, 会加上namespace
export default connect(({ home: { config, weather } }: ConnectState) => ({
  config,
  weather,
}))(Home);
