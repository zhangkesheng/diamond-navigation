import React from 'react';
import { CaretUpOutlined } from '@ant-design/icons';

import './box.less';
import {
  Menu,
  Card,
  Layout,
  Row,
  Col,
  Space,
  Anchor,
  Tooltip,
  Avatar,
} from 'antd';
import { Cat, Item } from '@/services/config';

export interface BoxProps {
  commonMenus?: Item[];
  shortCutClickHandler: (s: Item) => void;
  modeChange: (m: string) => void;
}

interface BoxState {}

export default class Box extends React.Component<BoxProps, BoxState> {
  constructor(props: BoxProps) {
    super(props);
  }

  render() {
    const { commonMenus, shortCutClickHandler, modeChange } = this.props;
    return (
      <div
        style={{
          paddingTop: '400px',
          bottom: 200,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {commonMenus &&
          commonMenus.length > 0 &&
          commonMenus
            .slice(0, 7)
            .sort((a, b) => (b.click || 0) - (a.click || 0))
            .map((v, i) => (
              <Avatar
                key={i}
                size={64}
                style={{ backgroundColor: 'rgb(20, 20, 20)', margin: '0 8px' }}
              >
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    shortCutClickHandler(v);
                  }}
                >
                  {v.title}
                </span>
              </Avatar>
            ))}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            modeChange('default');
          }}
        >
          <Avatar
            size={64}
            style={{ backgroundColor: 'rgb(20, 20, 20)', margin: '0 8px' }}
          >
            <CaretUpOutlined />
          </Avatar>
        </span>
      </div>
    );
  }
}
