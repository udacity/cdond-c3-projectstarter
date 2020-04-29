import * as React from 'react';
import style from './style.local.css';

export namespace Emtpy {
  export interface Props {
    title: string;
  }
}

export const Empty = ({ title }: Emtpy.Props) => {
  return (
    <div className={style['no-orders']}>
      <span className={style.icon} />
      <h3 className={style.title}>{title}</h3>
      {/* <span>If you need more information please contact us:</span>
      <a href={`mailto:${process.env.WP_HELP_EMAIL}`} className={style.email}>
        {process.env.WP_HELP_EMAIL}
      </a> */}
    </div>
  );
};
