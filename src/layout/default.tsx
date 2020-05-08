import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { ConnectProps, connect, IndexModelState } from 'umi';
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
    <>
      {/* <Header>Header</Header> */}
      <Content>{props.children}</Content>
      <Footer></Footer>
    </>
  );
};

export default connect(({ config }: IndexModelState) => ({ config }))(
  DefaultLayout,
);
