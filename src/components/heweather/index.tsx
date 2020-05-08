import React from 'react';
import {
  AirNowCity,
  AirForecast,
  Now,
  DailyForecast,
  Alarm,
} from '@/components/heweather/model';
import { Popover, Space, List, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface WeatherProps {
  weather: {
    city?: string;
    status?: string;
    air_now_city?: AirNowCity;
    air_forecast?: AirForecast[];
    now?: Now;
    daily_forecast?: DailyForecast[];
    alarm?: Alarm[];
  };
}

const weatherColumns: ColumnsType<any> = [
  { dataIndex: 'date', key: 'date' },
  { dataIndex: 'cond_txt_n', key: 'cond_txt_n' },
  {
    dataIndex: 'tmp_min',
    key: 'tmp_min',
    render: (t, r) => {
      return `${t}°C/${r.tmp_max}°C`;
    },
  },
  { dataIndex: 'qlty', key: 'qlty' },
];

const alarmColor: any = {
  蓝色: 'blue',
  黄色: 'yellow',
  橙色: 'orange',
  红色: 'red',
};

export default class Weather extends React.Component<WeatherProps> {
  weatherColumns = () => {};

  weatherContent = () => {
    const {
      weather: { air_forecast, daily_forecast },
    } = this.props;
    daily_forecast?.map((v, i) => {
      if (air_forecast) v.qlty = air_forecast[i].qlty;
    });
    // 为了抵消到popover的padding
    return (
      <Table
        style={{ margin: '-12px -16px' }}
        showHeader={false}
        pagination={false}
        columns={weatherColumns}
        size="small"
        dataSource={daily_forecast}
      />
    );
  };

  render() {
    const {
      weather: { city, now, air_now_city, alarm },
    } = this.props;
    return (
      <Popover
        style={{ padding: 0 }}
        content={this.weatherContent}
        title={'未来3天预报'}
        placement="bottomLeft"
      >
        <Space
          style={{
            padding: '8px 16px',
            border: '1px solid #434343',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {`${now?.tmp || ''}°C`}
          {city} {now?.cond_txt || ''}
          <span>
            {alarm?.map((v, i) => {
              return (
                <Tag key={i} color={alarmColor[v.level] || ''}>
                  {v.type}
                </Tag>
              );
            })}
          </span>
          {air_now_city?.qlty || ''}
        </Space>
      </Popover>
    );
  }
}
