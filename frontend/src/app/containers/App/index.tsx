import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Navbar } from 'app/components/Navbar';
import AddEmployee from 'app/containers/Employee/components/AddEmployee';
import EditEmployee from 'app/containers/Employee/components/EditEmployee';
import Employees from 'app/containers/Employee/components/Employees';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.local.css';
import style from '../../style.local.css';
import { ToastContainer } from 'react-toastify';
import ViewEmployee from 'app/containers/Employee/components/ViewEmployee';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

class App extends Component<App.Props> {
  constructor(props: App.Props) {
    super(props);
  }

  render() {
    const autoCloseTime = process.env.TOASTER_AUTO_CLOSE_TIME_IN_MILLISECONDS
      ? parseInt(process.env.TOASTER_AUTO_CLOSE_TIME_IN_MILLISECONDS, 10)
      : 3000;

    const CloseButton = ({ closeToast }: any) => (
      <a href="javascript:void(0)" className={style['e-toaster-close']}>
        <i
          className={`${style.icon} ${style['i-cancel']} ${style['margin-left']}`}
          aria-hidden="true"
          onClick={closeToast}
        />
      </a>
    );

    return (
      <div>
        <Navbar history={this.props.history} />
        <Switch>
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/new" component={AddEmployee} />
          <Route path="/employees/:employeeId/edit" component={EditEmployee} />
          <Route path="/employees/:employeeId/view" component={ViewEmployee} />
          <Route render={() => <Redirect to="/error" />} />
        </Switch>
        <ToastContainer
          closeButton={<CloseButton />}
          autoClose={autoCloseTime}
          hideProgressBar={true}
        />
      </div>
    );
  }
}

export default connect()(App);
