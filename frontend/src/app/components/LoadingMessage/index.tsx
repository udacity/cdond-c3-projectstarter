import * as React from 'react';
import { Component } from 'react';
import style from './style.local.css';

export namespace LoadingMessage {
  export interface Props {
    message: string;
  }
}

export class LoadingMessage extends Component<LoadingMessage.Props> {
  render() {
    return (
      <div className={style.loading}>
        <span>{this.props.message}</span>
      </div>
    );
  }
}
