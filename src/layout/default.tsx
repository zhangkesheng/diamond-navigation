import React, { useEffect } from 'react';
import { Layout, Space } from 'antd';
import { ConnectProps, connect, IndexModelState } from 'umi';
import moment from 'moment';
const { Header, Content, Footer } = Layout;

interface DefaultLayoutProps extends ConnectProps {}

const DefaultLayout: React.FC<ConnectProps> = props => {
  const { dispatch } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'home/load',
      });
    }
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        backgroundSize: '100%',
        backgroundImage: `url(${
          window.location.origin
        }/bg?date=${moment().format('YYYYMMDD')})`,
      }}
    >
      {/* <Header>Header</Header> */}
      <Content>{props.children}</Content>
      <Footer
        style={{
          textAlign: 'center',
          position: 'fixed',
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
    </div>
  );
};

export default connect(({ config }: IndexModelState) => ({ config }))(
  DefaultLayout,
);
