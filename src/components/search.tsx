import React, { ChangeEventHandler } from 'react';
import { connect, ConnectProps } from 'umi';
import { Input } from 'antd';

export interface SearchProps {
  platforms: SearchPlatform[];
  platformIdx: number;
  platformChangeHandler: (idx: number) => void;
}

interface SearchState {
  platformIdx: number;
}

export interface SearchPlatform {
  name: string;
  url: string;
}

export default class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      platformIdx: this.props.platformIdx,
    };
  }

  render() {
    const { platforms, platformIdx, platformChangeHandler } = this.props;

    return (
      <>
        <Input.Search
          allowClear={true}
          size="large"
          placeholder="使用Tab切换搜索平台"
          addonBefore={
            <span style={{ display: 'inline-block', width: 50 }}>
              {platforms[platformIdx] ? platforms[platformIdx].name : ''}
            </span>
          }
          onSearch={value => {
            if (value) window.open(`${platforms[platformIdx].url}${value}`);
          }}
          onKeyDown={e => {
            if (e.key === 'Tab') {
              e.preventDefault();
              platformChangeHandler(platformIdx);
            }
          }}
        />
      </>
    );
  }
}
