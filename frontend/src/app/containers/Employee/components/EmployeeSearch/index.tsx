import * as React from 'react';
import { omit } from 'app/utils';
import { connect } from 'react-redux';
import { RootState } from 'app/reducers';
import { EmployeeActions } from '../../actions';
import { EmployeeModel, EmployeeRowModel } from '../../models/EmployeeModel';
import { RouteComponentProps } from 'react-router';
import { Dispatch, bindActionCreators } from 'redux';
import { Table } from 'app/components/Table';
import { Column, SortingRule } from 'react-table';
import moment from 'moment';
import Gravatar from 'react-gravatar';
import '../../../../style.local.css';
import style from '../../../../style.local.css';
import {
  SearchInput,
  SearchBar,
  Breadcrumb,
  Button,
  ActionsMenu,
} from 'app/components';

export namespace Employees {
  export interface Props extends RouteComponentProps<void> {
    actions: EmployeeActions;
    employees: EmployeeModel[];
    isFetching: boolean;
    errorMessage: string;
    searchText: string;
  }

  export interface State {
    showActiveEmployees: boolean;
  }
}

export class Employees extends React.Component<
  Employees.Props,
  Employees.State
> {
  constructor(props: Employees.Props) {
    super(props);
    this.state = {
      showActiveEmployees: true,
    };
  }

  getTableColumns(): Column[] {
    return [
      {
        Header: '',
        id: 'gravatar',
        accessor: d => d.email,
        width: 50,
        resizable: false,
        sortable: false,
        Cell: row => {
          const email: string = row.value;
          return (
            <div className={style['e-gravatar-list']}>
              <Gravatar email={email} />
            </div>
          );
        },
      },
      {
        Header: 'Display Name',
        accessor: 'displayName',
        id: 'displayName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        id: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
        id: 'email',
      },
      {
        Header: 'Tags',
        id: 'tags',
        accessor: ({ tags }: EmployeeModel) => {
          if (!tags) {
            return '';
          }
          const obj: any[] = JSON.parse(tags);
          return obj.join(', ');
        },
      },
      {
        Header: 'Birthdate',
        id: 'birthdate',
        accessor: ({ birthdate }: EmployeeModel) => {
          if (!birthdate) {
            return '';
          }
          return moment(birthdate).format(EmployeeModel.dateFormat);
        },
      },
      {
        Header: 'Start Date',
        id: 'startDate',
        accessor: ({ startDate }: EmployeeModel) => {
          if (!startDate) {
            return '';
          }
          return moment(startDate).format(EmployeeModel.dateFormat);
        },
      },
      {
        Header: 'Action',
        id: 'action',
        width: 70,
        accessor: (e: EmployeeRowModel) => e,
        sortable: false,
        Cell: row => {
          const employeeId = row.value.id;
          const employeeStatus = row.value.isActive;
          if (!employeeId) {
            return '';
          }
          return (
            <ActionsMenu
              history={this.props.history}
              location={this.props.location}
              match={this.props.match}
              employeeId={employeeId}
              isActive={employeeStatus}
              actions={this.props.actions}
            />
          );
        },
      },
    ];
  }

  getDefaultSorted(): SortingRule[] {
    return [
      {
        id: 'lastName',
        desc: false,
      },
    ];
  }

  handleSearch = (searchText: string) => {};

  handleTableFilter = (filterText: string) => {
    this.props.actions.fetchEmployees(filterText);
  }

  handleToggleArchive = (showActive: boolean) => {
    this.setState({
      showActiveEmployees: !showActive,
    });
  }

  goBackToEmployees = () => {
    this.props.history.push('/employees');
  }

  goToCreateEmployee = () => {
    this.props.history.push('/employees/new');
  }

  componentDidMount = () => {
    this.props.actions.fetchEmployees();
  }

  thirdLevelBreadcrumb: React.CSSProperties = {
    cursor: 'default',
    textDecoration: 'none',
  };

  render = () => {
    const { isFetching, employees, searchText } = this.props;

    const tableProps: Table.Props = {
      data: this.state.showActiveEmployees
        ? employees.filter(e => e.isActive)
        : employees.filter(e => !e.isActive),
      loading: isFetching,
      columns: this.getTableColumns(),
      style: { marginTop: '0px', paddingLeft: '15px', verticalAlign: 'middle' },
      defaultSorted: this.getDefaultSorted(),
      headerStyle: { fontWeight: 'bold', backgroundColor: 'white' },
      onFilter: this.handleTableFilter,
      onToggleArchive: this.handleToggleArchive,
    };

    const generalSearch = (
      <SearchInput
        isFetching={isFetching}
        searchText={searchText}
        onSearchChange={this.handleSearch}
        placeholder='Search in the app'
        title='General Search'
      />
    );

    return (
      <div className={`${style['g-container']} ${style.fluid}`}>
        <SearchBar searchInput={generalSearch} />
        <div className={`${style['g-sectionbar']} ${style['grid-x']}`}>
          <Breadcrumb
            rootPathName='View & Manage Employees'
            isSecondaryPage={false}
          >
            <li>
              <a style={this.thirdLevelBreadcrumb}>Employees</a>
            </li>
            <li>
              <a style={this.thirdLevelBreadcrumb}>View & Manage</a>
            </li>
          </Breadcrumb>

          <div
            className={`${style.cell} ${style['medium-6']} ${style['small-12']} ${style['text-right']}`}
          >
            <div className={style['button-group']}>
              <Button
                className={`${style.button} ${style.primary} ${style.shaddy}`}
                title='Add Employee'
                onClick={this.goToCreateEmployee}
              >
                <i
                  className={`${style.icon} ${style['i-plus']} ${style['margin-right']}`}
                  aria-hidden='true'
                />
                Add New Employee
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Table {...tableProps} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState): Partial<Employees.Props> {
  return {
    employees: state.employees.employees,
    isFetching: state.employees.isFetching,
    errorMessage: state.employees.errorMessage,
  };
}

function mapActionsToProps(
  dispatch: Dispatch,
): Pick<Employees.Props, 'actions'> {
  return {
    actions: bindActionCreators(omit(EmployeeActions, 'Type'), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Employees as any);
