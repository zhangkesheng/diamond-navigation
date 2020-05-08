import React, { useEffect } from 'react';
import { ConnectProps, connect, HomeConfig } from 'umi';
import Search, { SearchPlatform } from '@/components/search';
import Box, { BoxItem } from '@/components/box';
import { Layout, Row, Col } from 'antd';
import { ConnectState } from '@/models/connect';
import Weather from '@/components/heweather';
import { AirNowCity, AirForecast, Now, DailyForecast } from './heweather';
import { Alarm } from '@/components/heweather/model';

interface HomeProps extends ConnectProps {
  config: HomeConfig;
  platforms: SearchPlatform[];
  boxItems: BoxItem[];
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
  const { config, platforms, boxItems, weather, dispatch } = props;

  const platformChangeHandler = (idx: number) => {
    if (dispatch)
      dispatch({
        type: 'home/setActivePlatform',
        payload: {
          config,
          idx: idx == platforms.length - 1 ? 0 : idx + 1,
        },
      });
  };

  const boxItemClickHandler = (catIdx: number, itemIdx: number) => {
    if (dispatch)
      dispatch({
        type: 'home/setCommon',
        payload: {
          config,
          catIdx,
          itemIdx,
        },
      });
    window.open(boxItems[catIdx].items[itemIdx].target, '_blank');
  };
  return (
    <div style={{ paddingTop: 200 }}>
      <Layout.Content style={{ width: 624, margin: '0 auto' }}>
        <Search
          platforms={platforms}
          platformIdx={config.activePlatformIdx}
          platformChangeHandler={platformChangeHandler}
        />
      </Layout.Content>
      <Layout.Content
        style={{ height: 500, width: 800, margin: '60px auto 0' }}
      >
        <Row style={{ marginBottom: 3 }}>
          <Col span={24}>
            <div style={{ float: 'right' }}>
              <Weather weather={weather} />
            </div>
          </Col>
        </Row>
        <Box
          boxItems={boxItems}
          commonItems={config.commonItems}
          boxItemClickHandler={boxItemClickHandler}
        />
      </Layout.Content>
    </div>
  );
};

// TODO: state的结构很奇怪, 会加上namespace
export default connect(
  ({ home: { config, platforms, boxItems, weather } }: ConnectState) => ({
    config,
    platforms,
    boxItems,
    weather,
  }),
)(Home);
