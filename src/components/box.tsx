import React from 'react';
import { ClickParam } from 'antd/es/menu';
import {
  CaretDownOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

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
  BackTop,
  Avatar,
  Popconfirm,
  Modal,
  Form,
  Input,
  Button,
} from 'antd';
import { Cat, Item } from '@/services/config';

export interface BoxProps {
  menus?: Cat[];
  commonMenus?: Item[];
  itemClickHandler: (s: Item) => void;
  modeChange: (m: string) => void;
  menuChange: (menus: Cat[]) => void;
}

interface BoxState {
  createCat: boolean;
  createItem: boolean;
  createCatIdx: number;
}

interface CatModalProps {
  visible: boolean;
  onCreate: (value: string) => void;
  onCancel: () => void;
}

const CatModal = (props: CatModalProps) => {
  const { visible, onCreate, onCancel } = props;
  const [form] = Form.useForm();
  return (
    <Modal
      title="添加分类"
      visible={visible}
      onOk={() => {
        form.validateFields().then(res => {
          onCreate(res.name);
          form.resetFields();
        });
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

interface ItemModalProps {
  visible: boolean;
  onCreate: (value: Item) => void;
  onCancel: () => void;
}

const ItemModal = (props: ItemModalProps) => {
  const { visible, onCreate, onCancel } = props;
  const [form] = Form.useForm();
  return (
    <Modal
      title="添加网站"
      visible={visible}
      onOk={() => {
        form.validateFields().then(res => {
          onCreate({
            title: res.title,
            url: res.url,
            desc: res.desc,
          });
          form.resetFields();
        });
      }}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="url" label="链接" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default class Box extends React.Component<BoxProps, BoxState> {
  constructor(props: BoxProps) {
    super(props);
    this.state = {
      createCat: false,
      createItem: false,
      createCatIdx: -1,
    };
  }

  menuHandler = ({ key }: ClickParam) => {
    if (!!!key) {
      return;
    }
    if (key == 'add') {
      this.setState({ createCat: true });
      return;
    }
    const item = document.getElementById(key);
    if (!item) {
      return;
    }
    item.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const {
      menus,
      commonMenus,
      itemClickHandler: shortCutClickHandler,
      modeChange,
      menuChange,
    } = this.props;
    const { createCat, createItem, createCatIdx } = this.state;
    return (
      <Row gutter={0} style={{ height: '100%' }}>
        <CatModal
          visible={createCat}
          onCancel={() => {
            this.setState({ createCat: false });
          }}
          onCreate={(name: string) => {
            menus?.push({
              cName: name,
              items: [],
            });
            this.setState(
              {
                createCat: false,
              },
              () => {
                menuChange(menus || []);
              },
            );
          }}
        ></CatModal>
        <ItemModal
          visible={createItem}
          onCancel={() => {
            this.setState({ createItem: false });
          }}
          onCreate={(item: Item) => {
            menus?.[createCatIdx].items?.push(item);
            this.setState(
              {
                createItem: false,
                createCatIdx: -1,
              },
              () => {
                menuChange(menus || []);
              },
            );
          }}
        />
        <Col span={4}>
          <Menu
            style={{ height: '100%' }}
            defaultSelectedKeys={['0']}
            onClick={this.menuHandler}
          >
            {menus &&
              menus.map((v, i) => (
                <Menu.Item key={`${i}`}>
                  <span>{`${v.cName} (${v.items?.length})`}</span>
                </Menu.Item>
              ))}
            <Menu.Item key="add" style={{ textAlign: 'center' }}>
              <PlusOutlined />
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={20}>
          <div
            id="box-content"
            className="box-content"
            style={{ height: 500, overflowY: 'scroll' }}
          >
            <BackTop
              target={() => document.getElementById('box-content') || window}
              style={{ position: 'absolute', right: '30px', bottom: '30px' }}
            />
            {commonMenus && commonMenus.length > 0 && (
              <Card
                bodyStyle={{ paddingBottom: 0 }}
                id="commonItems"
                key={'commonItems'}
                title={'常用'}
                bordered={false}
                extra={
                  <a
                    onClick={() => {
                      modeChange('simpler');
                    }}
                  >
                    <Avatar>
                      <CaretDownOutlined />
                    </Avatar>
                  </a>
                }
              >
                <Row gutter={16}>
                  {commonMenus
                    .sort((a, b) => (b.click || 0) - (a.click || 0))
                    .map((v, i) => (
                      <Col key={i} span={4} style={{ marginBottom: 16 }}>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            shortCutClickHandler(v);
                          }}
                        >
                          <Tooltip title={v.title}>
                            <Card
                              headStyle={{ padding: '0 10px' }}
                              bodyStyle={{ display: 'none' }}
                              type="inner"
                              title={v.title}
                            />
                          </Tooltip>
                        </span>
                      </Col>
                    ))}
                </Row>
              </Card>
            )}
            {menus &&
              menus.map((b, idx) => (
                <Card
                  bodyStyle={{ paddingBottom: 0 }}
                  id={`${idx}`}
                  key={idx}
                  title={<span>{b.cName}</span>}
                  bordered={false}
                  extra={
                    <a
                      type="link"
                      onClick={() => {
                        this.setState({
                          createItem: true,
                          createCatIdx: idx,
                        });
                      }}
                    >
                      <PlusOutlined />
                    </a>
                  }
                >
                  <Row gutter={16}>
                    {b.items &&
                      b.items.map((item, i) => (
                        <Col key={i} span={8} style={{ marginBottom: 16 }}>
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              shortCutClickHandler(item);
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
          </div>
        </Col>
      </Row>
    );
  }
}
