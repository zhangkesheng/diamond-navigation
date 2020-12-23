import { Avatar, Carousel } from 'antd';
import moment from 'moment';
import React from 'react';

interface TimeState {
  time: moment.Moment;
}

const week = ['一', '二', '三', '四', '五', '六', '日'];

export default class timeComp extends React.Component<{}, TimeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      time: moment(),
    };
    setInterval(() => {
      this.setState({
        time: moment(),
      });
    }, 10000);
  }
  render() {
    const { time } = this.state;
    return (
      <Carousel effect="fade" autoplay style={{ width: 50 }} dots={false}>
        <Avatar size={50} style={{ backgroundColor: 'rgb(0, 0, 0,.3)' }}>
          {time.format('HH:mm')}
        </Avatar>
        <Avatar size={50} style={{ backgroundColor: 'rgb(0, 0, 0,.3)' }}>
          周{week[Number(time.format('E'))]}
        </Avatar>
      </Carousel>
    );
  }
}
