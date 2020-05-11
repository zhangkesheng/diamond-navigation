import React from 'react';
import { ClickParam } from 'antd/es/menu';

import './box.less';
import { Menu, Card, Layout, Row, Col, Space, Anchor, Tooltip } from 'antd';
import { CommonItem } from 'umi';

export interface BoxProps {
  boxItems: BoxItem[];
  commonItems?: CommonItem[];
  boxItemClickHandler: (catIdx: number, itemIdx: number) => void;
}

interface BoxState {
  commonItems?: CommonItem[];
}

export interface BoxItem {
  category: string;
  category_id: string;
  icon: string;
  items: Item[];
}

export interface Item {
  title: string;
  desc: string;
  icon?: string;
  target: string;
  click: number;
}

export default class Box extends React.Component<BoxProps, BoxState> {
  constructor(props: BoxProps) {
    super(props);
  }

  menuHandler = ({ key }: ClickParam) => {
    if (!!!key) {
      return;
    }
    const item = document.getElementById(key);
    if (!item) {
      return;
    }
    item.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { boxItems, commonItems, boxItemClickHandler } = this.props;
    return (
      <Row gutter={0} style={{ height: '100%' }}>
        <Col span={4}>
          <Menu
            style={{ height: '100%' }}
            defaultSelectedKeys={['0']}
            onClick={this.menuHandler}
          >
            {boxItems &&
              boxItems.map(
                (v, i) =>
                  v.items.length > 0 && (
                    <Menu.Item key={`${i}`}>
                      <span>{`${v.category} (${v.items.length})`}</span>
                    </Menu.Item>
                  ),
              )}
          </Menu>
        </Col>
        <Col span={20}>
          <Layout.Content
            id="box-content"
            className="box-content"
            style={{ height: 500, overflowY: 'scroll' }}
          >
            {commonItems && commonItems.length > 0 && boxItems && (
              <Card
                bodyStyle={{ paddingBottom: 0 }}
                id="commonItems"
                key={'commonItems'}
                title={'常用'}
                bordered={false}
              >
                <Row gutter={16}>
                  {commonItems
                    .sort((a, b) => b.click - a.click)
                    .map((v, i) => (
                      <Col key={i} span={4} style={{ marginBottom: 16 }}>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            boxItemClickHandler(v.catIdx, v.itemIdx);
                          }}
                        >
                          <Tooltip
                            title={boxItems[v.catIdx].items[v.itemIdx].title}
                          >
                            <Card
                              headStyle={{ padding: '0 10px' }}
                              bodyStyle={{ display: 'none' }}
                              type="inner"
                              title={boxItems[v.catIdx].items[v.itemIdx].title}
                            />
                          </Tooltip>
                        </span>
                      </Col>
                    ))}
                </Row>
              </Card>
            )}
            {boxItems &&
              boxItems.map((b, idx) => (
                <Card
                  bodyStyle={{ paddingBottom: 0 }}
                  id={`${idx}`}
                  key={idx}
                  title={<span>{b.category}</span>}
                  bordered={false}
                >
                  <Row gutter={16}>
                    {b.items.map((item, i) => (
                      <Col key={i} span={8} style={{ marginBottom: 16 }}>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            boxItemClickHandler(idx, i);
                          }}
                        >
                          <Card
                            headStyle={{ padding: '0 10px' }}
                            bodyStyle={{ padding: 10 }}
                            type="inner"
                            title={item.title}
                          >
                            <span
                              style={{
                                display: 'inline-block',
                                height: 41,
                                overflowY: 'hidden',
                              }}
                            >
                              {item.desc}
                            </span>
                          </Card>
                        </span>
                      </Col>
                    ))}
                  </Row>
                </Card>
              ))}
          </Layout.Content>
        </Col>
      </Row>
    );
  }
}
