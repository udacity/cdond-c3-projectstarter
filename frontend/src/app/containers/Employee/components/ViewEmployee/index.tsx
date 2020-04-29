import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import { EmployeeModel, SalaryType, Gender } from '../../models/EmployeeModel';
import { EmployeeState } from '../../reducer/state';
import { EmployeeActions } from '../../actions';
import { Dispatch, bindActionCreators } from 'redux';
import { omit } from 'app/utils';
import { connect } from 'react-redux';
import '../../../../style.local.css';
import style from '../../../../style.local.css';
import { EmployeesService } from '../../services';
import { RouteComponentProps } from 'react-router';
import { SearchInput, Breadcrumb, SearchBar, Button } from 'app/components';

export namespace ViewEmployee {
  export interface Props extends RouteComponentProps<RoutePayload> {
    employees: EmployeeModel[];
    actions: EmployeeActions;
    isFetching: boolean;
    errorMessage: string;
    searchText: string;
  }

  export interface RoutePayload {
    employeeId: any;
  }

  export interface State {
    employeeId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    displayName: string;
    companyEmail: string;
    personalEmail: string;
    birthdate: Date;
    phoneNumber: string;
    address: string;
    tags: any[];
    country: string;
    region: string;
    city: string;
    salary: number;
    salaryType: SalaryType;
    effectiveDate: Date;
    isActive: boolean;
    gender: Gender;
    startDate: Date;
    bankName: string;
    accountNumber: string;
  }
}

export class ViewEmployee extends Component<
  ViewEmployee.Props,
  ViewEmployee.State
> {
  private employeeService: EmployeesService;
  constructor(props: ViewEmployee.Props, context?: any) {
    super(props, context);

    const { employeeId } = this.props.match.params;
    this.employeeService = new EmployeesService();
    this.state = {
      employeeId,
      firstName: '',
      lastName: '',
      middleName: '',
      secondLastName: '',
      displayName: '',
      companyEmail: '',
      personalEmail: '',
      phoneNumber: '',
      address: '',
      birthdate: new Date(),
      tags: [],
      country: '',
      region: '',
      city: '',
      salary: 0,
      salaryType: SalaryType.YEARLY,
      effectiveDate: new Date(),
      isActive: true,
      gender: Gender.MALE,
      startDate: new Date(),
      bankName: '',
      accountNumber: '',
    };
  }

  async componentDidMount() {
    try {
      const employee: EmployeeModel = await this.employeeService.getEmployeeById(
        this.state.employeeId,
      );
      this.setState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        middleName: employee.middleName,
        secondLastName: employee.secondLastName,
        displayName: employee.displayName,
        companyEmail: employee.companyEmail,
        personalEmail: employee.personalEmail,
        phoneNumber: employee.phoneNumber,
        address: employee.address,
        birthdate: new Date(employee.birthdate),
        tags: JSON.parse(employee.tags),
        country: employee.country,
        region: employee.region,
        city: employee.city,
        salary: employee.salary,
        salaryType: employee.salaryType,
        effectiveDate: employee.effectiveDate,
        isActive: employee.isActive,
        gender: employee.gender,
        startDate: employee.startDate,
        bankName: employee.bankName,
        accountNumber: employee.accountNumber,
      });
    } catch (err) {
      this.props.history.push('/employees');
    }
  }

  handleSearch = (searchText: string) => {};

  containerStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  textStyle: React.CSSProperties = {
    fontFamily: 'Mukta, Helvetica, Roboto, Arial, sans-serif',
  };

  goBackToEmployees = () => {
    this.props.history.push('/employees');
  }

  goToEditEmployee = () => {
    this.props.history.push(`/employees/${this.state.employeeId}/edit`);
  }

  thirdLevelBreadcrumb: React.CSSProperties = {
    cursor: 'default',
    textDecoration: 'none',
  };

  render() {
    const { isFetching, searchText } = this.props;

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
            rootPathName={this.state.displayName}
            isSecondaryPage={true}
          >
            <li onClick={this.goBackToEmployees}>
              <a>Employees</a>
            </li>
            <li onClick={this.goBackToEmployees}>
              <a>View & Manage</a>
            </li>
            <li>
              <a style={this.thirdLevelBreadcrumb}>View</a>
            </li>
          </Breadcrumb>

          <div
            className={`${style.cell} ${style['medium-6']} ${style['small-12']} ${style['text-right']}`}
          >
            <div className={style['button-group']}>
              <Button
                className={`${style.button} ${style.primary} ${style.shaddy}`}
                title='Edit'
                onClick={this.goToEditEmployee}
              >
                <i
                  className={`${style.icon} ${style['i-edit']} ${style['margin-right']}`}
                  aria-hidden='true'
                />
                Edit Info
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`${style['g-content']} ${style['grid-container']} ${style.fluid}`}
          style={this.textStyle}
        >
          <form>
            <div
              className={`${style['g-main']} ${style['grid-x']} ${style['grid-margin-x']}`}
            >
              <div
                className={`${style.cell} ${style['medium-4']} ${style['large-3']}`}
              >
                <div className={style['cont-gravatar']}>
                  <Gravatar
                    email={this.state.companyEmail}
                    size={150}
                    className={style['e-avatar-empty']}
                  />
                </div>
                <h5 style={this.textStyle}>tags</h5>
                <div className={style['cont-tags']}>
                  <ul className={style['e-tags-list']}>
                    {this.state.tags.map((name, index) => {
                      return (
                        <li key={index}>
                          <span className={style['e-tag']}>{name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div
                className={`${style.cell} ${style['medium-6']} ${style['large-6']}`}
              >
                <div className={style['input-cell']}>
                  <label htmlFor='displayname'>Display Name</label>
                  <div className={`${style['read-input']} ${style.big}`}>
                    {this.state.displayName}
                  </div>
                </div>
                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='firstname'>First Name</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.firstName}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='middlename'>Middle name</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.middleName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='lastname'>Last Name</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.lastName}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='secondlastname'>Second Last Name</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.secondLastName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='lastname'>Gender</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.gender === Gender.MALE ? 'Male' : 'Female'}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='secondlastname'>Start Date</label>
                      <div className={`${style['read-input']}`}>
                        {moment(this.state.startDate).format('MM-DD-YYYY')}
                      </div>
                    </div>
                  </div>
                </div>

                <h5 style={this.textStyle}>Salary</h5>
                <div className={style['input-cell']}>
                  <div className={`${style['read-input']}`}>
                    {this.state.salaryType === SalaryType.YEARLY
                      ? 'Yearly'
                      : 'Hourly'}
                  </div>
                </div>
                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='salary'>Amount</label>
                      <div className={style['input-group']}>
                        <span>$</span>
                        <div className={`${style['read-input']}`}>
                          {' '}
                          {this.state.salary}
                        </div>
                        <label className={style['medium-gray']}>
                          {this.state.salaryType === SalaryType.HOURLY
                            ? ' / hour'
                            : ' / year'}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <label htmlFor='effectiveDate'>Effective Date</label>
                    <div className={`${style['read-input']}`}>
                      {moment(this.state.effectiveDate).format('MM-DD-YYYY')}
                    </div>
                  </div>
                </div>
                <h5 style={this.textStyle}>Contact info</h5>
                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='companyEmail'>Company Email Address</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.companyEmail}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='personalEmail'>
                        Personal Email Address
                      </label>
                      <div className={`${style['read-input']}`}>
                        {this.state.personalEmail}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='phoneNumber'>Phone Number</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.phoneNumber}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='birthdate'>Birthday</label>
                      <div className={`${style['read-input']}`}>
                        {moment(this.state.birthdate).format('MM-DD-YYYY')}
                      </div>
                    </div>
                  </div>
                </div>

                <h5 style={this.textStyle}>Bank Information</h5>
                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='bankName'>Bank Name</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.bankName}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='accountNumber'>Account Number</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.accountNumber}
                      </div>
                    </div>
                  </div>
                </div>

                <h5 style={this.textStyle}>Address</h5>
                <div
                  className={`${style.cell} ${style['small-12']} ${style['medium-8']} ${style['large-9']}`}
                >
                  <div className={style['input-cell']}>
                    <label htmlFor='addressLine'>Address line</label>
                    <div className={`${style['read-input']}`}>
                      {this.state.address}
                    </div>
                  </div>
                  <div
                    className={`${style['grid-x']} ${style['grid-margin-x']}`}
                  >
                    <div
                      className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                    >
                      <div className={style['input-cell']}>
                        <label htmlFor='country'>Country</label>
                        <div className={`${style['read-input']}`}>
                          {this.state.country}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                    >
                      <div className={style['input-cell']}>
                        <label htmlFor='region'>State/Province</label>
                        <div className={`${style['read-input']}`}>
                          {this.state.region}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='city'>City</label>
                      <div className={`${style['read-input']}`}>
                        {this.state.city}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${style.cell} ${style['medium-2']} ${style['large-3']}`}
              >
                <div className={style['e-emp-status']}>
                  <label htmlFor='displayname'>Employee Status</label>
                  <div
                    className={`${style['e-status-mark']} ${
                      !this.state.isActive ? style.disabled : style.active
                    }`}
                  />
                  <div className={`${style['read-input']}`}>
                    <div className={`${style['read-input']}`}>
                      {!this.state.isActive ? 'Disabled' : 'Active'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: EmployeeState): Partial<ViewEmployee.Props> {
  return {
    employees: state.employees,
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
  };
}

function mapActionsToProps(
  dispatch: Dispatch,
): Pick<ViewEmployee.Props, 'actions'> {
  return {
    actions: bindActionCreators(omit(EmployeeActions, 'Type'), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ViewEmployee as any);
