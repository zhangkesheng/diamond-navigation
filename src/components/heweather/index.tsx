import React from 'react';
import {
  AirNowCity,
  AirForecast,
  Now,
  DailyForecast,
  Alarm,
} from '@/components/heweather/model';
import { Popover, Space, List, Table, Tag, Carousel } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Avatar from 'antd/lib/avatar/avatar';

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
  weatherContent = () => {
    const {
      weather: { air_forecast, daily_forecast },
    } = this.props;
    daily_forecast?.map((v, i) => {
      if (air_forecast) v.qlty = air_forecast[i].qlty;
    });
    // 为了抵消到popover的padding
    return (
      <div style={{ margin: '-12px -16px' }}>
        <Table
          showHeader={false}
          pagination={false}
          columns={weatherColumns}
          size="small"
          dataSource={daily_forecast}
          rowKey="date"
        />
      </div>
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
        title={
          <>
            <span>3日预报</span>
            {alarm?.map((v, i) => {
              return (
                <Tag key={i} color={alarmColor[v.level] || ''}>
                  {v.type}
                </Tag>
              );
            })}
          </>
        }
        placement="bottomLeft"
      >
        <a>
          <Carousel effect="fade" autoplay style={{ width: 50 }} dots={false}>
            <div style={{ width: 50 }}>
              <Avatar size={50}>{now?.cond_txt || ''}</Avatar>
            </div>
            <div style={{ width: 50 }}>
              <Avatar size={50}>{`${now?.tmp || ''}°C`}</Avatar>
            </div>
            {alarm?.map((v, i) => {
              return (
                <Avatar
                  size={50}
                  key={i}
                  style={{ backgroundColor: alarmColor[v.level] || '' }}
                >
                  {v.type}
                </Avatar>
              );
            })}
          </Carousel>
        </a>
      </Popover>
    );
  }
}
