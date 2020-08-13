import React, { useEffect } from 'react';
import { Layout, Space } from 'antd';
import { ConnectProps, connect, IndexModelState } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
const { Header, Content, Footer } = Layout;

interface DefaultLayoutProps extends ConnectProps {
  config: {
    title?: string;
  };
}

const DefaultLayout: React.FC<DefaultLayoutProps> = props => {
  const { dispatch, config } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/init',
      });
      dispatch({
        type: 'home/load',
      });
    }

    // 设置定时检查背景图
    const timer = setInterval(() => {
      if (dispatch) {
        dispatch({
          type: 'home/refreshBg',
        });
      }
    }, 3600000);
    // clearing interval
    return () => clearInterval(timer);
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
          backgroundColor: 'rgba(255, 255, 255, 0)',
          color: '#FFF',
        }}
      >
        <Space>
          HOME
          {`©${moment().format('YYYY')}`}
          皖ICP备18001287号-2
        </Space>
      </Footer>
    </Layout>
  );
};

export default connect(({ global: { config } }: ConnectState) => ({ config }))(
  DefaultLayout,
);
