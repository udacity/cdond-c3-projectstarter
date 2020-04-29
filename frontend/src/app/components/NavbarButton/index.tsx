import * as React from 'react';
import { Button } from '../Button';
import style from './style.local.css';

export namespace NavbarButton {
  export interface Props {
    title?: string;
    children: any;
    style?: React.CSSProperties;
    className?: string;
    onClick?(): void;
  }
}

export const NavbarButton = (props: NavbarButton.Props) => {
  return (
    <Button
      onClick={props.onClick}
      title={props.title}
      className={`${style['navbar-button']} ${style[props.className || '']}`}
      style={props.style}
    >
      {props.children}
    </Button>
  );
};
