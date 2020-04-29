import * as React from 'react';
import { Component } from 'react';
import style from './style.local.css';
import classNames from 'classnames';

export namespace Button {
  export interface Props {
    className?: string;
    style?: React.CSSProperties;
    onClick?: any;
    onMouseLeave?: any;
    title?: string;
    disabled?: boolean;
    type?: any;
  }
}

export class Button extends Component<Button.Props> {
  getClassNames() {
    const propClassName = this.props.className || '';
    return classNames({
      [style.button]: true,
      [propClassName]: propClassName,
    });
  }

  render() {
    return (
      <button
        type={this.props.type || 'button'}
        style={this.props.style}
        className={this.getClassNames()}
        onClick={this.props.onClick}
        title={this.props.title}
        disabled={this.props.disabled}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.props.children}
      </button>
    );
  }
}
