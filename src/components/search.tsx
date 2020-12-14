import React, { ChangeEventHandler } from 'react';
import { Input } from 'antd';
import { SearchEngine } from '@/services/config';

export interface SearchProps {
  searches: SearchEngine[];
  platformChangeHandler: (idx: number) => void;
  placeholder?: string;
}

interface SearchState {}

export interface SearchPlatform {
  name: string;
  url: string;
}

export default class SearchComp extends React.Component<
  SearchProps,
  SearchState
> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    const { searches, platformChangeHandler, placeholder } = this.props;
    const activeIdx = searches.findIndex(v => v.active);

    return (
      <>
        <Input.Search
          allowClear={true}
          size="large"
          placeholder={placeholder || '使用Tab切换搜索平台'}
          addonBefore={
            <span style={{ display: 'inline-block', width: 50 }}>
              {searches[activeIdx] ? searches[activeIdx].name : ''}
            </span>
          }
          onSearch={value => {
            if (value) window.open(`${searches[activeIdx].url}${value}`);
          }}
          onKeyDown={e => {
            if (e.key === 'Tab') {
              e.preventDefault();
              platformChangeHandler(activeIdx);
            }
          }}
        />
      </>
    );
  }
}
