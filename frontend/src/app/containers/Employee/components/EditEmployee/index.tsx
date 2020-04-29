import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { SalaryType } from '../../models/EmployeeModel';
import { EmployeeState } from '../../reducer/state';
import { EmployeeActions } from '../../actions';
import { Dispatch, bindActionCreators } from 'redux';
import { omit, showErrorNotification } from 'app/utils';
import { connect } from 'react-redux';
import style from '../../../../style.local.css';
import { EmployeesService } from '../../services';
import { RouteComponentProps } from 'react-router';
import TagsInput from 'react-tagsinput';
import { SearchInput, Breadcrumb, SearchBar } from 'app/components';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { withAutoSave, Debounce } from './withAutoSave';
import { isInputEmpty, isInputGreaterThanOrEqualMinValue, doesInputMatchesEmailPattern } from './inputValidations';

export namespace EditEmployee {
  export interface Props extends RouteComponentProps<RoutePayload> {
    actions: EmployeeActions;
    isFetching: boolean;
    errorMessage: string;
    searchText: string;
    debounce: Debounce;
  }

  export interface RoutePayload {
    employeeId: string;
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
    tags: Array<any>;
    country: string;
    region: string;
    city: string;
    salary: number;
    salaryType: SalaryType;
    effectiveDate: Date;
    isActive: boolean;
  }
}

export class EditEmployee extends Component<EditEmployee.Props, EditEmployee.State> {
  state: EditEmployee.State;
  private employeeService: EmployeesService;

  constructor(props: EditEmployee.Props, context?: any) {
    super(props, context);
    this.employeeService = new EmployeesService();
    const { employeeId } = this.props.match.params;
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
    };
  }

  async componentDidMount() {
    try {
      const employee = await this.employeeService.getEmployeeById(
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
        effectiveDate: new Date(employee.effectiveDate),
        isActive: employee.isActive,
      });
    } catch (err) {
      this.props.history.push('/employees');
    }
  }

  clearFields = () => {
    this.setState({
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
    });
  }

  processInputChange = (
    statePayload: Partial<EditEmployee.State>,
    requestExecutionCallback: () => void,
    isInputValid: boolean = true,
    invalidInputMessage?: string
  ) => {
    const debounceCallback = () => {
      if (isInputValid) {
        requestExecutionCallback();
      } else {
        invalidInputMessage && showErrorNotification(invalidInputMessage);
      }
    };

    this.props.debounce(Object.keys(statePayload)[0], debounceCallback);
    this.setState({ ...this.state, ...statePayload });
  }

  handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const requestExecutionCallback =
      () => this.props.actions.updateStringField(this.state.employeeId, { value: value }, name);

    this.processInputChange(
      { displayName: value },
      requestExecutionCallback,
      !isInputEmpty(value),
      `Display Name field is required`
    );
  };

  handleFirstNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { middleName, lastName, secondLastName } = this.state;
    const requestExecutionCallback = () => this.props.actions.updateNames(
      this.state.employeeId,
      { firstName: target.value, lastName, middleName, secondLastName }
    );

    this.processInputChange(
      { firstName: target.value },
      requestExecutionCallback,
      !isInputEmpty(target.value),
      `First name field is required`
    );
  };

  handleMiddleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { firstName, lastName, secondLastName } = this.state;
    const requestExecutionCallback = () => this.props.actions.updateNames(
      this.state.employeeId,
      { firstName, lastName, middleName: target.value, secondLastName }
    );

    this.processInputChange(
      { middleName: target.value },
      requestExecutionCallback
    );
  };

  handleLastNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { firstName, middleName, secondLastName } = this.state;
    const { value } = target;
    const requestExecutionCallback = () => this.props.actions.updateNames(
      this.state.employeeId,
      { firstName, middleName, lastName: value, secondLastName }
    );

    this.processInputChange(
      { lastName: value },
      requestExecutionCallback,
      !isInputEmpty(value),
      `Last name field is required`
    );
  };

  handleSecondLastNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { firstName, middleName, lastName } = this.state;
    const { value } = target;
    const requestExecutionCallback = () => this.props.actions.updateNames(
      this.state.employeeId,
      { firstName, middleName, lastName, secondLastName: value }
    );

    this.processInputChange(
      { secondLastName: target.value },
      requestExecutionCallback
    );
  };

  handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const salaryMinValue = 0.01;
    const salaryValue = Number(value);
    const requestExecutionCallback = () => this.props.actions.updateNumberField(
      this.state.employeeId,
      { value: salaryValue },
      name
    );

    this.processInputChange(
      { salary: salaryValue },
      requestExecutionCallback,
      isInputGreaterThanOrEqualMinValue(salaryValue, salaryMinValue),
      `Salary must be greater than or equal to ${salaryMinValue}`
    );
  };

  handleCompanyEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const requestExecutionCallback = () => this.props.actions.updateStringField(
      this.state.employeeId,
      { value },
      name
    );

    this.processInputChange(
      { companyEmail: value },
      requestExecutionCallback,
      !isInputEmpty(value) && doesInputMatchesEmailPattern(value),
      `Company email is invalid`
    );
  };

  handlePersonalEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const requestExecutionCallback = () => this.props.actions.updateStringField(
      this.state.employeeId,
      { value },
      name
    );

    this.processInputChange(
      { personalEmail: value },
      requestExecutionCallback,
      isInputEmpty(value) || doesInputMatchesEmailPattern(value),
      `Personal email is invalid`
    );
  };

  handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const requestExecutionCallback = () => this.props.actions.updateStringField(
      this.state.employeeId,
      { value },
      name
    );

    this.processInputChange(
      { phoneNumber: value },
      requestExecutionCallback
    );
  };

  handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { address, country, region, employeeId } = this.state;
    const requestExecutionCallback = () => this.props.actions.updateAddress(
      employeeId,
      { address, country, region, city: value }
    );

    this.processInputChange(
      { city: value },
      requestExecutionCallback,
      !isInputEmpty(value),
      `City is invalid`
    );
  };

  selectCountry = (val: React.ChangeEvent<string>) => {
    const country = (val as unknown) as string;
    const { address, city, region, employeeId } = this.state;
    const requestExecutionCallback = () => this.props.actions.updateAddress(
      employeeId,
      { address, country, region, city }
    );

    this.processInputChange(
      { country: country },
      requestExecutionCallback,
      !isInputEmpty(country),
      `Country is invalid`
    );
  };

  selectRegion = (val: React.ChangeEvent<string>) => {
    const region = (val as unknown) as string;
    const { address, city, country, employeeId } = this.state;
    const requestExecutionCallback = () => this.props.actions.updateAddress(
      employeeId,
      { address, country, region, city }
    );
    this.processInputChange(
      { region },
      requestExecutionCallback,
      !isInputEmpty(region),
      `Region is invalid`
    );
  };

  handleAddressLineChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    const { country, region, city, employeeId } = this.state;
    const requestExecutionCallback = () => this.props.actions.updateAddress(
      employeeId,
      { address: value, country, region, city }
    );

    this.processInputChange(
      { address: value },
      requestExecutionCallback
    );
  }

  handleBirthdateChanged = (date: Date | null) => {
    const birthdate = date || new Date();
    this.processInputChange(
      { birthdate: birthdate },
      () => this.props.actions.updateDateField(this.state.employeeId, { value: birthdate }, 'birthdate'), //thunk
    );
  }

  handleEffectiveDateChanged = (date: Date | null) => {
    const effectiveDate = date || new Date();
    this.processInputChange(
      { effectiveDate: effectiveDate },
      () => this.props.actions.updateDateField(this.state.employeeId, { value: effectiveDate }, 'effectiveDate'), //thunk
      !isInputEmpty(effectiveDate.toString()),
      `Effective Date is invalid` //error notification
    );
  }

  handleTagsChange = (newTags: Array<any>) => {
    this.processInputChange(
      { tags: newTags },
      () => this.props.actions.updateStringField(this.state.employeeId, { value: JSON.stringify(newTags) }, 'tags'), //thunk
    );
  }

  handleSearch = (searchText: string) => { };

  handleSalaryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.processInputChange(
      { salaryType: value as SalaryType },
      () => this.props.actions.updateStringField(this.state.employeeId, { value }, 'salaryType'), //thunk
    );
  }

  statusOnChange = () => {
    const { employeeId, isActive } = this.state;
    this.processInputChange(
      { isActive: !isActive },
      () => isActive ? this.props.actions.deactivateEmployee(employeeId) : this.props.actions.activateEmployee(employeeId),
    );
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
          <Breadcrumb
            rootPathName={this.state.displayName}
            isSecondaryPage={true}
          >
            <li>
              <a onClick={this.goBackToEmployees}>Employees</a>
            </li>
            <li>
              <a onClick={this.goBackToEmployees}>View & Manage</a>
            </li>
            <li>
              <a style={this.thirdLevelBreadcrumb}>Modify</a>
            </li>
          </Breadcrumb>
        </div>

        <div
          className={`${style['g-content']} ${style['grid-container']} ${style.fluid}`}
          style={this.textStyle}
        >
          <form autoComplete='off'>
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
                  onChange={this.handleTagsChange}
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
                    onChange={this.handleDisplayNameChange}
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
                        onChange={this.handleFirstNameChange}
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
                        onChange={this.handleMiddleNameChange}
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
                        onChange={this.handleLastNameChange}
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
                        onChange={this.handleSecondLastNameChange}
                        maxLength={50}
                      />
                    </div>
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
                          onChange={this.handleSalaryChange}
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
                      onChange={this.handleEffectiveDateChanged}
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
                      onChange={this.handleCompanyEmailChange}
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
                      onChange={this.handlePersonalEmailChange}
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
                      onChange={this.handlePhoneNumberChange}
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
                      onChange={this.handleBirthdateChanged}
                    />
                  </div>
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
                    onChange={this.handleAddressLineChange}
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
                          onChange={this.selectCountry}
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
                          onChange={this.selectRegion}
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
                        onChange={this.handleCityChange}
                        maxLength={50}
                        required
                      />
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
                  <select
                    onChange={this.statusOnChange}
                    value={!this.state.isActive ? 'Disabled' : 'Active'}
                  >
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: EmployeeState): Partial<EditEmployee.Props> {
  return {
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
  };
}

function mapActionsToProps(
  dispatch: Dispatch,
): Pick<EditEmployee.Props, 'actions'> {
  return {
    actions: bindActionCreators(omit(EmployeeActions, 'Type'), dispatch),
  };
}

const autoSaveComponent = withAutoSave(EditEmployee);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(autoSaveComponent as any);
