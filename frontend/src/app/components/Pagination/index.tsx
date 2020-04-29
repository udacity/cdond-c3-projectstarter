import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import style from './style.local.css';
import { Button } from 'app/components/Button';

export namespace Pagination {
  export interface Props {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    loading: boolean;
  }

  export interface State {
    pages: number;
    pageFirstOrderIndex: number;
    pageLastOrderIndex: number;
    currentPage: string;
  }
}

export class Pagination extends Component<Pagination.Props, Pagination.State> {
  constructor(props: Pagination.Props) {
    super(props);
    this.state = {
      pages: this.getNumberOfPages(props),
      pageFirstOrderIndex: this.getPageFirstOrderIndex(props),
      pageLastOrderIndex: this.getPageLastOrderIndex(props),
      currentPage: String(this.props.page),
    };
  }

  getNumberOfPages(props: Pagination.Props) {
    return Math.ceil(props.total / props.pageSize);
  }

  getPageFirstOrderIndex(props: Pagination.Props) {
    return (props.page - 1) * props.pageSize + 1;
  }

  getPageLastOrderIndex(props: Pagination.Props) {
    const pageLastOrderIndex = props.page * props.pageSize;
    if (pageLastOrderIndex > props.total) {
      return props.total;
    }
    return pageLastOrderIndex;
  }

  componentWillReceiveProps(nextProps: Pagination.Props) {
    const newState: Partial<Pagination.State> = {};
    const pageSizeDidChanged = this.pageSizeDidChanged(nextProps.pageSize);
    const totalDidChanged = this.totalDidChanged(nextProps.total);
    const pageDidChanged = this.pageDidChanged(nextProps.page);
    if (pageSizeDidChanged || totalDidChanged || pageDidChanged) {
      newState.pages = this.getNumberOfPages(nextProps);
      newState.pageFirstOrderIndex = this.getPageFirstOrderIndex(nextProps);
      newState.pageLastOrderIndex = this.getPageLastOrderIndex(nextProps);
      newState.currentPage = String(nextProps.page);
    }
    this.setState(newState as any);
  }

  pageDidChanged(newPage: number) {
    return this.props.page !== newPage;
  }

  pageSizeDidChanged(newPageSize: number) {
    return this.props.pageSize !== newPageSize;
  }

  totalDidChanged(newTotal: number) {
    return this.props.total !== newTotal;
  }

  handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = event;
    const { currentPage } = this.state;
    const { page, onPageChange } = this.props;

    if (key === 'Escape') this.restorePageInputFromProps();

    if (!currentPage || page === parseInt(currentPage, 10)) return;

    const newPage = parseInt(this.state.currentPage || '1', 10);
    const numberOfPages = Math.ceil(this.props.total / this.props.pageSize);

    if (newPage <= 0) {
      this.setState({ currentPage: '1' });
      return;
    }

    if (newPage > numberOfPages) {
      this.setState({ currentPage: String(numberOfPages) });
      return;
    }

    if (key === 'Enter') onPageChange(parseInt(currentPage, 10) || 1);
  }

  handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isAValidNumber = /^[0-9]+$/.test(event.target.value);
    if (isAValidNumber || event.target.value === '') {
      this.setState({ currentPage: event.target.value });
    }
  }

  goToPreviousPage() {
    this.props.onPageChange(this.props.page - 1);
  }

  goToNextPage() {
    this.props.onPageChange(this.props.page + 1);
  }

  renderPreviousButton() {
    return (
      <Button
        disabled={this.props.page === 1 || this.props.loading}
        className={style.Pagination__button}
        onClick={this.goToPreviousPage.bind(this)}
        title='Previous Page'
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Previous
      </Button>
    );
  }

  renderNextButton() {
    return (
      <Button
        disabled={this.props.page === this.state.pages || this.props.loading}
        className={style.Pagination__button}
        onClick={this.goToNextPage.bind(this)}
        title='Next Page'
      >
        Next
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    );
  }

  restorePageInputFromProps() {
    this.setState({ currentPage: String(this.props.page) });
  }

  render() {
    return (
      <div className={style.Pagination__container}>
        <span>
          {this.state.pageFirstOrderIndex} - {this.state.pageLastOrderIndex} of{' '}
          {this.props.total} orders
        </span>
        <div className={style['Pagination__buttons-container']}>
          {this.renderPreviousButton()}
          <label>Page</label>
          <input
            className={style.Pagination__input}
            type='text'
            value={this.state.currentPage}
            onKeyDown={this.handleOnKeyDown.bind(this)}
            onChange={this.handleOnChange.bind(this)}
            onBlur={this.restorePageInputFromProps.bind(this)}
            disabled={this.props.loading}
          />
          <label>of {this.state.pages}</label>
          {this.renderNextButton()}
        </div>
      </div>
    );
  }
}
