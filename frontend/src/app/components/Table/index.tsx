import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import ReactTable, { Column, SortingRule } from 'react-table';

import appstyle from '../../style.local.css';
import style from './react-table.css';
import '../../style.local.css';
import './react-table.css';

export namespace Table {
  export interface Props {
    data: ReadonlyArray<any>;
    loading: boolean;
    columns: Column[];
    headerStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    defaultSorted: SortingRule[];
    onFilter(searchText: string): any;
    onToggleArchive(showActive: boolean): any;
  }

  export interface State {
    typingTimeout: NodeJS.Timer | number;
    searchText: string;
    showActiveEmployees: boolean;
  }
}

export class Table extends Component<Table.Props, Table.State> {
  constructor(props: Table.Props, context?: any) {
    super(props, context);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      typingTimeout: 0,
      searchText: '',
      showActiveEmployees: true,
    };
  }

  tableClasses() {
    return classNames({
      [style.ReactTable]: true,
      'table-large': true,
      '-highlight': true,
      '-striped': true,
    });
  }

  getHeadersStyle = () => ({ style: { ...(this.props.headerStyle || {}) } });

  textStyle: React.CSSProperties = {
    fontFamily: 'Mukta, Helvetica, Roboto, Arial, sans-serif',
    color: '#4f4f4f',
  };

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout as NodeJS.Timer);
    }
    this.setState({
      searchText: event.target.value,
      typingTimeout: setTimeout(() => {
        const searchText = this.state.searchText;
        const shouldResetSearch = searchText.length === 0;
        if (searchText.length >= 2 || shouldResetSearch) {
          this.props.onFilter(this.state.searchText);
        }
      }, 500),
    });
  }

  toggleTab = (e: any) => {
    e.preventDefault();
    if (this.state.showActiveEmployees) return;
    this.setState({
      showActiveEmployees: true,
    });
    this.props.onToggleArchive(this.state.showActiveEmployees);
  }

  toggleArchiveTab = (e: any) => {
    e.preventDefault();
    if (!this.state.showActiveEmployees) return;
    this.setState({
      showActiveEmployees: false,
    });
    this.props.onToggleArchive(this.state.showActiveEmployees);
  }

  render() {
    const { data, columns, loading, defaultSorted } = this.props;
    return (
      <div
        className={`
        ${appstyle['g-content-fluid']} ${appstyle['table-container']} ${
          appstyle['grid-container']
        } ${appstyle.fluid} ${appstyle['grid-padding-x']} ${appstyle.full}
        `}
        style={this.textStyle}
      >
        <form>
          <div
            className={`
            ${appstyle['grid-x']}
            ${appstyle['grid-padding-x']}
            ${appstyle['table-controls']}`}
          >
            <div
              className={`${appstyle.cell} ${appstyle['medium-12']} ${
                appstyle['small-12']
              } ${appstyle['large-8']}`}
            >
              <ul className={`${appstyle.tabs}`} data-tabs='emp-list-control'>
                <li
                  className={`${appstyle['tabs-title']} ${
                    appstyle[this.state.showActiveEmployees ? 'is-active' : '']
                  }`}
                >
                  <a href='#' onClick={this.toggleTab}>
                    Active
                  </a>
                </li>
                <li
                  className={`${appstyle['tabs-title']} ${
                    appstyle[this.state.showActiveEmployees ? '' : 'is-active']
                  }`}
                >
                  <a href='#' onClick={this.toggleArchiveTab}>
                    Archived
                  </a>
                </li>
              </ul>
              <div className={`${appstyle['cont-table-filters']}`}>
                <div
                  className={`${appstyle['input-group']}`}
                  style={{ marginBottom: 0 }}
                >
                  <input
                    type='text'
                    placeholder='Type to filter...'
                    value={this.state.searchText}
                    onChange={this.handleInputChange}
                  />
                  <div className={`${appstyle['input-group-button']}`}>
                    <button className={`${appstyle.hollow}`}>
                      <i
                        className={`${appstyle.icon} ${appstyle['i-search']}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${appstyle.cell} ${appstyle['medium-12']} ${
                appstyle['small-12']
              } ${appstyle['large-4']} ${appstyle['text-right']}`}
            />
          </div>
          <div className={`${appstyle['g-main']}`}>
            <ReactTable
              data={data as any[]}
              pageSize={data.length}
              className={`${this.tableClasses()} ${appstyle.hover} ${
                appstyle['table-large']
              }`}
              getTheadThProps={() => ({
                ...this.getHeadersStyle(),
              })}
              columns={columns}
              noDataText=''
              showPagination={false}
              loading={loading}
              defaultSorted={defaultSorted}
              multiSort={true}
            />
          </div>
        </form>
      </div>
    );
  }
}
