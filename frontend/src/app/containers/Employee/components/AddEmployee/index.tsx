import React, { Component, createRef } from 'react';
import Gravatar from 'react-gravatar';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { Gender, EmployeeModel, SalaryType } from '../../models/EmployeeModel';
import { EmployeeState } from '../../reducer/state';
import { EmployeeActions } from '../../actions';
import { Dispatch, bindActionCreators } from 'redux';
import { omit, confirmDialog } from 'app/utils';
import { connect } from 'react-redux';
import '../../../../style.local.css';
import style from '../../../../style.local.css';
import { RouteComponentProps } from 'react-router';
import TagsInput from 'react-tagsinput';
import './react-tagsinput.css';
import { SearchInput, SearchBar, Breadcrumb, Button } from 'app/components';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import text from 'assets/translations';

export namespace AddEmployee {
  export interface Props extends RouteComponentProps<void> {
    employees: EmployeeModel[];
    actions: EmployeeActions;
    isFetching: boolean;
    errorMessage: string;
    searchText: string;
  }

  export interface State {
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;

    displayName: string;
    companyEmail: string;
    personalEmail: string;
    birthdate: Date;
    startDate: Date;
    gender: Gender;
    phoneNumber: string;
    address: string;
    bankName: string;
    accountNumber: string;
    tags: [];
    country: '';
    region: '';
    city: '';
    salary: number;
    salaryType: SalaryType;
    effectiveDate: Date;
  }
}

class AddEmployee extends Component<AddEmployee.Props> {
  state: AddEmployee.State;
  private myRef = createRef<HTMLFormElement>();

  constructor(props: AddEmployee.Props, context?: any) {
    super(props, context);

    this.state = {
      firstName: '',
      lastName: '',
      middleName: '',
      secondLastName: '',
      displayName: '',
      companyEmail: '',
      personalEmail: '',
      gender: Gender.MALE,
      phoneNumber: '',
      address: '',
      bankName: '',
      accountNumber: '',
      birthdate: new Date(),
      startDate: new Date(),
      tags: [],
      country: '',
      region: '',
      city: '',
      salary: 0,
      salaryType: SalaryType.YEARLY,
      effectiveDate: new Date(),
    };
  }

  clearFields = () => {
    this.setState({
      firstName: '',
      lastName: '',
      middleName: '',
      secondLastName: '',
      displayName: '',
      email: '',
      personalEmail: '',
      gender: Gender.MALE,
      phoneNumber: '',
      address: '',
      bankName: '',
      accountNumber: '',
      birthdate: new Date(),
      startDate: new Date(),
      tags: [],
      country: '',
      region: '',
      city: '',
      salary: 0,
      salaryType: SalaryType.YEARLY,
      effectiveDate: new Date(),
    });
  }

  handleFormReset = async () => {
    const answer = await confirmDialog.fire({
      title: text.DISCARD_CHANGES,
      text: text.CANCEL_CHANGES_QUESTION,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: text.NO,
      confirmButtonText: text.YES,
    });

    if (answer.value) {
      this.clearFields();
      this.goBackToEmployees();
    }
  }

  handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const node = this.myRef.current;
    if (node) {
      node.reportValidity();
    }
    if (node && !node.checkValidity()) return;

    event.preventDefault();
    event.stopPropagation();

    const payload: EmployeeModel = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      middleName: this.state.middleName,
      secondLastName: this.state.secondLastName,
      displayName: this.state.displayName,
      companyEmail: this.state.companyEmail,
      personalEmail: this.state.personalEmail,
      gender: this.state.gender,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      bankName: this.state.bankName,
      accountNumber: this.state.accountNumber,
      birthdate: this.state.birthdate,
      startDate: this.state.startDate,
      tags: JSON.stringify(this.state.tags),
      country: this.state.country,
      region: this.state.region,
      city: this.state.city,
      salary: this.state.salary,
      salaryType: this.state.salaryType,
      effectiveDate: this.state.effectiveDate,
      isActive: true,
    };

    await this.props.actions.addEmployee(payload);
  }

  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      address: event.target.value,
    });
  }

  handleBirthdateChanged(date: Date) {
    this.setState({
      birthdate: date,
    });
  }

  handleStartDateChanged(date: Date) {
    this.setState({
      startDate: date,
    });
  }

  handleEffectiveDateChanged(date: Date) {
    this.setState({
      effectiveDate: date,
    });
  }

  handleTagsChange(newTags: any[]) {
    this.setState({ tags: newTags });
  }

  selectCountry(val: React.ChangeEvent<string>) {
    this.setState({ country: val });
  }

  selectRegion(val: React.ChangeEvent<string>) {
    this.setState({ region: val });
  }

  handleSearch = (searchText: string) => {};
  handleSalaryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      salaryType: event.target.value,
    });
  }

  containerStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  textStyle: React.CSSProperties = {
    fontFamily: 'Mukta, Helvetica, Roboto, Arial, sans-serif',
  };

  goBackToEmployees = () => {
    this.props.history.push('/employees');
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
          <Breadcrumb rootPathName='Add a New Employee' isSecondaryPage={true}>
            <li>
              <a onClick={this.handleFormReset}>Employees</a>
            </li>
            <li>
              <a onClick={this.handleFormReset}>View & Manage</a>
            </li>
            <li>
              <a style={this.thirdLevelBreadcrumb}>Add New</a>
            </li>
          </Breadcrumb>

          <div
            className={`${style.cell} ${style['medium-6']} ${style['small-12']} ${style['text-right']}`}
          >
            <div className={style['button-group']}>
              <Button
                className={`${style.button} ${style.secondary} ${style.clear}`}
                title='Cancel'
                onClick={this.handleFormReset}
              >
                <i
                  className={`${style.icon} ${style['i-cancel']} ${style['margin-right']}`}
                  aria-hidden='true'
                />
                Cancel
              </Button>
              <Button
                className={`${style.button} ${style.secondary} ${style.shaddy}`}
                title='Add Employee'
                onClick={this.handleFormSubmit}
              >
                <i
                  className={`${style.icon} ${style['i-check']} ${style['margin-right']}`}
                  aria-hidden='true'
                />
                Add Employee
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`${style['g-content']} ${style['grid-container']} ${style.fluid}`}
          style={this.textStyle}
        >
          <form
            ref={this.myRef}
            onSubmit={this.handleFormSubmit}
            autoComplete='off'
          >
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
                <TagsInput
                  value={this.state.tags}
                  onChange={this.handleTagsChange.bind(this)}
                />
                <small className='medium-gray'>Press tab to create tags.</small>
              </div>

              <div
                className={`${style.cell} ${style['medium-6']} ${style['large-6']}`}
              >
                <div className={style['input-cell']}>
                  <label htmlFor='displayname' className={style.required}>
                    Display Name
                  </label>
                  <input
                    type='text'
                    name='displayName'
                    id='displayname'
                    value={this.state.displayName}
                    onChange={this.handleTextChange}
                    onBlur={this.handleTextChange}
                    maxLength={50}
                    className='largeinput'
                    placeholder='Display Name'
                    required
                  />
                </div>
                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='firstname' className={style.required}>
                        First Name
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        id='firstname'
                        value={this.state.firstName}
                        onChange={this.handleTextChange}
                        onBlur={this.handleTextChange}
                        required
                        maxLength={50}
                      />
                    </div>
                  </div>

                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='middlename'>Middle name</label>
                      <input
                        type='text'
                        name='middleName'
                        id='middlename'
                        value={this.state.middleName}
                        onChange={this.handleTextChange}
                        onBlur={this.handleTextChange}
                        maxLength={50}
                      />
                    </div>
                  </div>
                </div>

                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='lastname' className={style.required}>
                        Last Name
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        id='lastname'
                        value={this.state.lastName}
                        onChange={this.handleTextChange}
                        onBlur={this.handleTextChange}
                        required
                        maxLength={50}
                      />
                    </div>
                  </div>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='secondlastname'>Second Last Name</label>
                      <input
                        type='text'
                        name='secondLastName'
                        id='secondlastname'
                        value={this.state.secondLastName}
                        onChange={this.handleTextChange}
                        onBlur={this.handleTextChange}
                        maxLength={50}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`${style.cell} ${style['medium-6']} ${style['large-6']}`}
                >
                  <div className={style['input-cell']}>
                    <label htmlFor='gender' className={style.required}>
                      Gender
                    </label>
                    <select
                      name='gender'
                      id='gender'
                      onChange={this.handleSelectChange}
                      onBlur={this.handleSelectChange}
                      value={this.state.gender}
                    >
                      <option value={Gender.MALE} style={this.textStyle}>
                        Male
                      </option>
                      <option value={Gender.FEMALE} style={this.textStyle}>
                        Female
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className={`${style.cell} ${style['small-12']} ${style['medium-8']} ${style['large-4']}`}
                >
                  <div className={style['input-cell']}>
                    <label htmlFor='startDate' className={style.required}>
                      Start Date
                    </label>
                    <DatePicker
                      name='startDate'
                      id='startdate'
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChanged.bind(this)}
                    />
                  </div>
                </div>

                <h5 style={this.textStyle}>Salary</h5>
                <div className={style['input-cell']}>
                  <input
                    type='radio'
                    value={SalaryType.YEARLY}
                    name='yearlySalary'
                    checked={this.state.salaryType === SalaryType.YEARLY}
                    onChange={this.handleSalaryTypeChange}
                  />
                  <label>Yearly</label>
                  <input
                    type='radio'
                    value={SalaryType.HOURLY}
                    name='hourlySalary'
                    checked={this.state.salaryType === SalaryType.HOURLY}
                    onChange={this.handleSalaryTypeChange}
                  />
                  <label>Hourly</label>
                </div>

                <div className={`${style['grid-x']} ${style['grid-margin-x']}`}>
                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label htmlFor='salary' className={style.required}>
                        Set amount
                      </label>
                      <div className={style['input-group']}>
                        <span className={style['input-group-label']}>$</span>
                        <input
                          type='number'
                          name='salary'
                          id='salary'
                          value={this.state.salary}
                          onChange={this.handleTextChange}
                          min='0.01'
                          step='0.01'
                        />
                        <label className={style['medium-gray']}>
                          {this.state.salaryType === SalaryType.HOURLY
                            ? '/hour'
                            : '/year'}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <label htmlFor='effectiveDate' className={style.required}>
                      Effective Date
                    </label>
                    <DatePicker
                      name='effectiveDate'
                      id='effectiveDate'
                      selected={this.state.effectiveDate}
                      onChange={this.handleEffectiveDateChanged.bind(this)}
                      required
                    />
                  </div>
                </div>

                <h5 style={this.textStyle}>Contact info</h5>
                <div
                  className={`${style.cell} ${style['medium-8']} ${style['large-6']}`}
                >
                  <div className={style['input-cell']}>
                    <label htmlFor='email' className={style.required}>
                      Email
                    </label>
                    <input
                      type='email'
                      name='companyEmail'
                      id='email'
                      value={this.state.companyEmail}
                      onChange={this.handleTextChange}
                      onBlur={this.handleTextChange}
                      required
                      maxLength={50}
                      placeholder='Organization email address'
                      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    />
                  </div>
                </div>

                <div
                  className={`${style.cell} ${style['medium-8']} ${style['large-6']}`}
                >
                  <div className={style['input-cell']}>
                    <label htmlFor='personalEmail'>Personal email</label>
                    <input
                      type='email'
                      name='personalEmail'
                      id='personalemail'
                      value={this.state.personalEmail}
                      onChange={this.handleTextChange}
                      onBlur={this.handleTextChange}
                      maxLength={50}
                      placeholder='Personal/Alternative email address'
                      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    />
                  </div>
                </div>

                <div
                  className={`${style.cell} ${style['medium-8']} ${style['large-6']}`}
                >
                  <div className={style['input-cell']}>
                    <label htmlFor='phoneNumber'>Phone number</label>
                    <input
                      type='tel'
                      name='phoneNumber'
                      id='phonenumber'
                      value={this.state.phoneNumber}
                      onChange={this.handleTextChange}
                      onBlur={this.handleTextChange}
                      maxLength={50}
                      placeholder='Enter a valid phone number'
                    />
                  </div>
                </div>

                <div
                  className={`${style.cell} ${style['small-12']} ${style['medium-8']} ${style['large-4']}`}
                >
                  <div className={style['input-cell']}>
                    <label htmlFor='birthdate'>Birthday</label>
                    <DatePicker
                      name='birthdate'
                      id='birthdate'
                      selected={this.state.birthdate}
                      onChange={this.handleBirthdateChanged.bind(this)}
                    />
                  </div>
                </div>

                <h5 style={this.textStyle}>Bank Information</h5>
                <div>
                  <label htmlFor='bankName'>Bank name</label>
                  <input
                    type='text'
                    name='bankName'
                    id='bankname'
                    value={this.state.bankName}
                    onChange={this.handleTextChange}
                    onBlur={this.handleTextChange}
                    maxLength={50}
                  />
                </div>
                <div>
                  <label htmlFor='accountNumber'>Account number</label>
                  <input
                    type='text'
                    name='accountNumber'
                    id='accountnumber'
                    value={this.state.accountNumber}
                    onChange={this.handleTextChange}
                    onBlur={this.handleTextChange}
                    maxLength={50}
                  />
                </div>

                <h5 style={this.textStyle}>Address</h5>
                <div
                  className={`${style.cell} ${style['small-12']} ${style['medium-8']} ${style['large-9']}`}
                >
                  <label htmlFor='addressLine'>Address line</label>
                  <textarea
                    name='addressLine'
                    id='addressline'
                    value={this.state.address}
                    onChange={this.handleTextAreaChange}
                    onBlur={this.handleTextAreaChange}
                    maxLength={200}
                  />

                  <div
                    className={`${style['grid-x']} ${style['grid-margin-x']}`}
                  >
                    <div
                      className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                    >
                      <div className={style['input-cell']}>
                        <label className={style.required} htmlFor='country'>
                          Country
                        </label>
                        <CountryDropdown
                          value={this.state.country}
                          onChange={val => this.selectCountry(val)}
                          required
                        />
                      </div>
                    </div>
                    <div
                      className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                    >
                      <div className={style['input-cell']}>
                        <label className={style.required} htmlFor='region'>
                          State/Province
                        </label>
                        <RegionDropdown
                          country={this.state.country}
                          value={this.state.region}
                          onChange={val => this.selectRegion(val)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${style.cell} ${style['small-12']} ${style['medium-6']}`}
                  >
                    <div className={style['input-cell']}>
                      <label className={style.required} htmlFor='city'>
                        City
                      </label>
                      <input
                        type='text'
                        name='city'
                        id='city'
                        value={this.state.city}
                        onChange={this.handleTextChange}
                        onBlur={this.handleTextChange}
                        maxLength={50}
                        required
                      />
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

function mapStateToProps(state: EmployeeState): Partial<AddEmployee.Props> {
  return {
    employees: state.employees,
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
  };
}

function mapActionsToProps(
  dispatch: Dispatch,
): Pick<AddEmployee.Props, 'actions'> {
  return {
    actions: bindActionCreators(omit(EmployeeActions, 'Type'), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(AddEmployee as any);
