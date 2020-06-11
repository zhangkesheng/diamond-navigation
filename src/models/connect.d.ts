import { HomeModelState } from './home';
import { IndexModelState } from 'umi';

export interface ConnectState {
  global: IndexModelState;
  home: HomeModelState;
}
