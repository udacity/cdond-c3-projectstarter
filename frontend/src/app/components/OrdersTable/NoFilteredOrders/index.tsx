import * as React from 'react';
import { Component } from 'react';

import style from './style.local.css';
import { Button } from '../../Button';

export namespace NoFilteredOrders {
  export interface Props {
    searchText: string;
    handleResetOrders: (searchText: string) => void;
  }
}

export class NoFilteredOrders extends Component<NoFilteredOrders.Props> {
  render() {
    return (
      <div className={style['no-orders']}>
        <span className={style.icon} />
        <h3 className={style.title}>{`We couldn't find any orders related to "${
          this.props.searchText
        }"`}</h3>
        <span>
          Please try with a different order number,
          <br />
          recipient name or company.
        </span>
        <Button
          onClick={() => this.props.handleResetOrders('')}
          className={style.Rectangle}
        >
          Back to all orders
        </Button>
      </div>
    );
  }
}
