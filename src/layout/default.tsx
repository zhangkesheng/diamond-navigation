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
  }, []);

  if (config.title) {
    document.title = config.title;
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
        height: '100%',
        backgroundSize: '100%',
        backgroundImage: `url(https://services.bestzks.com/public/bing/daily?date=${moment().format(
          'YYYYMMDD',
        )})`,
      }}
    >
      {/* <Header>Header</Header> */}
      <Content>{props.children}</Content>
      <Footer
        style={{
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
