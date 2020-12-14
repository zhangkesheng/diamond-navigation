import React from 'react';
import { LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { decode } from '@/utils/jwt';
import { Checkbox, List, Popover, Table, Typography } from 'antd';
import _ from 'lodash';

export interface AccountProps {
  token?: string;
  id_token?: string;
  logout?: () => void;
  changeSlogan?: (slogan: string) => void;
  todo?: Array<any>;
  info?: any;
}

interface AccountState {}

export default class AccountComp extends React.Component<
  AccountProps,
  AccountState
> {
  constructor(props: AccountProps) {
    super(props);
  }

  avatar(info: any) {
    if (info.avatar) {
      return (
        <a>
          <Avatar src={info.avatar} size={50}></Avatar>
        </a>
      );
    }

    if (info.nick) {
      return (
        <a>
          <Avatar size={50}>{info.nick}</Avatar>
        </a>
      );
    }

    return (
      <a>
        <Avatar size={50}>
          <UserOutlined />
        </Avatar>
      </a>
    );
  }

  todo() {
    const { todo } = this.props;
    const list = _.groupBy(todo, 'cycle');
    return (
      <>
        {_.map(list, (v, k) => {
          return (
            <List
              header={k}
              dataSource={v}
              renderItem={item => (
                <List.Item actions={[<Checkbox></Checkbox>]}>
                  {item.title}
                </List.Item>
              )}
            ></List>
          );
        })}
      </>
    );
  }

  render() {
    const { token, id_token, logout, changeSlogan } = this.props;
    if (!token) {
      return (
        <a href="http://localhost:8080/test/login.html" title="Login">
          <Avatar size={50}>
            <LoginOutlined />
          </Avatar>
        </a>
      );
    }

    let info = { avatar: '', nick: '', desc: '' };
    if (id_token) {
      info = decode(id_token);
    }

    return (
      <Popover
        title={
          <List.Item
            actions={[
              <a onClick={logout} title="Logout">
                <LogoutOutlined />
              </a>,
            ]}
            style={{ width: 200 }}
          >
            <List.Item.Meta
              avatar={this.avatar(info)}
              title={info.nick}
              description={
                <Typography.Paragraph editable={{ onChange: changeSlogan }}>
                  {info.desc || 'Slogan'}
                </Typography.Paragraph>
              }
              style={{ width: '100%' }}
            />
          </List.Item>
        }
        content={<div></div>}
        placement="topLeft"
      >
        {this.avatar(info)}
      </Popover>
    );
  }
}
