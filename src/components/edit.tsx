import React from 'react';

import { Config, SearchEngine, Cat } from '@/services/config';
import {
  Avatar,
  Drawer,
  Collapse,
  Input,
  Form,
  Radio,
  Modal,
  message,
  Tag,
  List,
  Space,
  Button,
} from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import MenuEdit from './menuEdit';

export interface EditProps {
  config: Config;
  onConfigChange: (config: Config) => void;
}

interface EditState {
  config: Config;
  showDrawer: boolean;
  searchModal: boolean;
}

interface SearchModalProps {
  visible: boolean;
  onCreate: (values: SearchEngine) => void;
  onCancel: () => void;
}

const SearchModal = (props: SearchModalProps) => {
  const { visible, onCreate, onCancel } = props;

  const [form] = Form.useForm();
  return (
    <Modal
      title="添加搜索引擎"
      visible={visible}
      onOk={() => {
        form.validateFields().then(res => {
          onCreate({ name: res.name, url: res.url });
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
        <Form.Item name="url" label="搜索地址" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default class Edit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);
    this.state = {
      config: props.config,
      showDrawer: false,
      searchModal: false,
    };
  }

  componentWillReceiveProps(nextProps: EditProps) {
    this.setState({
      config: nextProps.config,
    });
  }

  export = () => {
    const { config } = this.state;
    let uri =
      'data:text/json;charset=utf-8,\ufeff' +
      encodeURIComponent(JSON.stringify(config));
    let link = document.createElement('a');
    link.href = uri;
    link.download = 'Home-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  import = () => {};

  render() {
    const { onConfigChange } = this.props;
    const { config, showDrawer, searchModal } = this.state;
    return (
      <>
        <a
          onClick={() => {
            this.setState({
              showDrawer: true,
            });
          }}
        >
          <Avatar
            size={50}
            style={{ position: 'absolute', top: '100px', right: '100px' }}
          >
            <SettingOutlined />
          </Avatar>
        </a>
        <Drawer
          title="设置"
          closable={true}
          visible={showDrawer}
          onClose={() => {
            this.setState({
              showDrawer: !showDrawer,
            });
          }}
          bodyStyle={{ padding: 0 }}
          // footerStyle={{ padding: 0, border: 0 }}
          // footer={
          //   <>
          //     <Button size="large" style={{ width: "50%" }} type="primary" onClick={this.import}>导入</Button>
          //     <Button size="large" style={{ width: "50%" }} onClick={this.export}>导出</Button>
          //   </>
          // }
        >
          <Collapse bordered={false} defaultActiveKey="5">
            <Collapse.Panel header="信息" key="1">
              <Form
                initialValues={config.info}
                layout="vertical"
                onValuesChange={(_, info) => {
                  this.setState({ config: { ...config, info } });
                  onConfigChange({ ...config, info });
                }}
              >
                <Form.Item name="title" label="标题">
                  <Input />
                </Form.Item>
              </Form>
            </Collapse.Panel>
            <Collapse.Panel header="配置" key="2">
              <Form
                initialValues={config.setting}
                layout="vertical"
                onValuesChange={(_, setting) => {
                  this.setState({ config: { ...config, setting } });
                  onConfigChange({ ...config, setting });
                }}
              >
                <Form.Item name="mode" label="模式">
                  <Radio.Group>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="simpler">Simpler</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="theme" label="主题">
                  <Radio.Group defaultValue="dark">
                    <Radio.Button value="dark">Dark</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Collapse.Panel>
            <Collapse.Panel header="搜索配置" key="3">
              <List
                header={
                  <Space>
                    <span>搜索引擎</span>
                    <PlusOutlined
                      onClick={() => {
                        this.setState({ searchModal: true });
                      }}
                    />
                  </Space>
                }
                dataSource={config.searches}
                renderItem={(item, i) => (
                  <List.Item>
                    <Tag
                      style={{
                        border: 'none',
                        background: 'none',
                        fontSize: 14,
                      }}
                      closable={true}
                      visible={true}
                      onClose={() => {
                        config.searches.splice(i, 1);
                        this.setState({ config: { ...config } });
                        onConfigChange({ ...config });
                      }}
                    >
                      {item.name}
                    </Tag>
                  </List.Item>
                )}
              />
            </Collapse.Panel>
            <Collapse.Panel header="常用菜单" key="4">
              {config.commons.map((v, i) => (
                <Tag
                  key={i}
                  style={{ fontSize: 16 }}
                  closable={true}
                  visible={true}
                  onClose={() => {
                    config.commons.splice(i, 1);
                    this.setState({ config: { ...config } });
                    onConfigChange({ ...config });
                  }}
                >
                  {v.title}
                </Tag>
              ))}
            </Collapse.Panel>
            <Collapse.Panel header="工具菜单" key="5">
              <MenuEdit
                menus={config.cats}
                onMenuChange={(m: Cat[]) => {
                  onConfigChange({ ...config, cats: m });
                }}
              />
            </Collapse.Panel>
          </Collapse>
        </Drawer>
        <SearchModal
          visible={searchModal}
          onCancel={() => {
            this.setState({ searchModal: false });
          }}
          onCreate={(s: SearchEngine) => {
            config.searches.push(s);
            onConfigChange(config);
            this.setState(
              { searchModal: false },
              message.info(`添加搜索引擎[${s.name}]`),
            );
          }}
        />
      </>
    );
  }
}
