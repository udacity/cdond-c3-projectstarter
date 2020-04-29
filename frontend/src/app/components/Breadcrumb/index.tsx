import * as React from 'react';
import '../../style.local.css';
import style from '../../style.local.css';

export namespace BreadCrumb {
  export interface Props {
    children?: any;
    rootPathName?: string;
    isSecondaryPage: boolean;
  }
}

export const Breadcrumb = (props: BreadCrumb.Props) => {
  return (
    <div className={`${style.cell} ${style['medium-6']} ${style['small-12']}`}>
      <nav aria-label='You are here:' role='navigation'>
        <ul className={style.breadcrumbs}>
          {props.children ? props.children : ''}
        </ul>
      </nav>
      <h3 className={style['s-title']}>
        {props.isSecondaryPage ? (
          <a className={style['e-button-back']} href='#'>
            <i className={`${style.icon} ${style['i-chevron-left']}`} />
          </a>
        ) : (
          ''
        )}

        <span>{props.rootPathName ? props.rootPathName : ''}</span>
      </h3>
    </div>
  );
};
