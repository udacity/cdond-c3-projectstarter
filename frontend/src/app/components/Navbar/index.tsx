import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import '../../style.local.css';
import style from '../../style.local.css';

export namespace Navbar {
  export interface Props extends Pick<RouteComponentProps<void>, 'history'> {}

  export interface State {
    isEmployeesActive: boolean;
    // isInventoryActive: boolean;
    currentPath: string;
  }
}

export class Navbar extends React.Component<Navbar.Props, Navbar.State> {
  constructor(props: Navbar.Props) {
    super(props);

    this.state = {
      isEmployeesActive: true,
      // isInventoryActive: false,
      currentPath: props.history.location.pathname,
    };
  }

  componentDidMount() {
    this.updateCurrentMenu();
  }

  componentDidUpdate() {
    const prevPath = this.state.currentPath;
    const { pathname: currPath } = this.props.history.location;
    if (prevPath !== currPath) this.updateCurrentMenu();
  }

  updateCurrentMenu() {
    const path = this.props.history.location.pathname;
    this.setState({
      isEmployeesActive: /employees/.test(path),
      // isInventoryActive: /inventory/.test(path),
      currentPath: path,
    });
  }

  shouldViewChange(destination: string) {
    return destination !== this.state.currentPath;
  }

  goToEmployees = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const destination = '/employees';
    if (this.shouldViewChange(destination))
      this.props.history.push(destination);
  };

  goToAddEmployee = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const destination = '/employees/new';
    if (this.shouldViewChange(destination))
      this.props.history.push(destination);
  };

  render() {
    // const { isEmployeesActive } = this.state;

    return (
      <div
        className={`${style['g-wrapper']} ${style['page-edit']} ${style['grid-container']}`}
      >
        <div className={style['g-sidebar']}>
          <button
            className={`${style['mob-closenav']} ${style['close-button']} `}
            aria-label="Close Navigation Bar"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className={style['g-applogo']}>
            <h1 className={style.logoimage}>
              <a href="#" aria-label="Home page">
                <span>Glee</span>
              </a>
            </h1>
          </div>

          <ul
            className={`${style.vertical} ${style.menu} ${style['accordion-menu']}`}
            data-accordion=""
          >
            <li
              className={`${style['accordion-item']} ${style['is-active']}`}
              data-accordion-item=""
            >
              <a className={style['accordion-title']} href="#">
                <i
                  className={`${style.icon} ${style['i-user']} ${style['margin-right']}`}
                />
                <span>Employees</span>
              </a>

              <ul className={`${style.menu} ${style.vertical} ${style.nested}`}>
                <li className="active">
                  <a href="#" onClick={this.goToEmployees}>
                    <i
                      className={`${style.icon} ${style['i-list']} ${style['margin-right']}`}
                    />
                    <span>View & Manage</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.goToAddEmployee}>
                    <i
                      className={`${style.icon} ${style['i-plus']} ${style['margin-right']}`}
                    />
                    <span>Add New</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
