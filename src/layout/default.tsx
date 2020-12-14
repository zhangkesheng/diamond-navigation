import React, { useEffect } from 'react';
import { Layout, Space } from 'antd';
import { ConnectProps, connect, IndexModelState } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import _ from 'lodash';

const { Header, Content, Footer } = Layout;

interface DefaultLayoutProps extends ConnectProps {
  config: {
    title?: string;
  };
}

const DefaultLayout: React.FC<DefaultLayoutProps> = props => {
  const { dispatch, config } = props;

  useEffect(() => {
    const code = _.get(props.location.query, 'code');
    const clientId = _.get(props.location.query, 'clientId');
    if (code) {
      if (dispatch) {
        dispatch({
          type: 'global/login',
          payload: {
            code,
            clientId,
          },
          callback: res => {
            window.location.search = '';
          },
        });
      }
    }

    const token = localStorage.getItem('token');
    if (token) {
      if (dispatch)
        dispatch({
          type: 'global/getUser',
        });
    }

    if (dispatch) {
      dispatch({
        type: 'global/init',
      });
    }

    // 设置更新检查背景图
    setInterval(() => {
      if (dispatch) {
        dispatch({
          type: 'home/refreshBg',
        });
      }
    }, 3600000);
  }, []);

  if (config.title) {
    document.title = config.title;
  }

  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      {/* <Header>Header</Header> */}
      <Content>{props.children}</Content>
      <Footer
        style={{
          position: 'fixed',
          textAlign: 'center',
          bottom: '0',
          width: '100%',
          backgroundColor: 'rgba(20,20,20)',
          color: '#FFF',
          padding: 8,
        }}
      >
        <Space>
          <span>HOME</span>
          <span>© 2020-{moment().format('YYYY')} Bestzks</span>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            皖ICP备18001287号-2
          </a>
        </Space>
      </Footer>
    </Layout>
  );
};

export default connect(({ global: { config } }: ConnectState) => ({ config }))(
  DefaultLayout,
);
