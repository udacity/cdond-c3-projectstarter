import * as React from 'react';
import '../../style.local.css';
import style from '../../style.local.css';

export namespace SearchBar {
  export interface Props {
    searchInput?: JSX.Element;
  }

  export interface State {
    showGoButton: boolean;
    showNavigationBar: boolean;
  }
}

export class SearchBar extends React.Component<SearchBar.Props> {
  state = {
    showGoButton: false,
    showNavigationBar: false,
  };
  // renderBreadCrumb () {
  //   return this.props.children ? this.props.children
  //     : <a style={{color: '#264b96'}}>{this.props.rootPathName}</a>;

  //   // return <a style={{color: '#264b96'}}>{this.props.rootPathName}</a>;
  // }
  // onSearchFocus: ((event: FocusEvent<HTMLInputElement>)){

  // };
  // state: SearchBar.State;

  onSearchFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      showGoButton: true,
    });
  }

  onSearchBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      showGoButton: false,
    });
  }

  onOpenNavigationBar = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.setState({
      showNavigationBar: true,
    });
  }

  render() {
    // const { searchInput } = this.props;
    return (
      // <div className={style["search-bar"]}>
      //   {this.props.children}
      //   {searchInput ? (
      //     <div className={`${style["bread-bar-container"]}`}>
      //       {this.props.searchInput}
      //     </div>
      //   ) : null}
      // </div>
      <div className={`${style['g-topbar']} ${style['grid-x']}`}>
        <div
          className={`${style.cell} ${style['medium-10']} ${style['small-12']}`}
        >
          <div className={style['cont-menu-tablet']}>
            <a
              className={`${style['btn-menu-tablet']} ${style.button} ${
                style.primary
              } ${style.clear}`}
              aria-label='Open Navigation Bar'
              onClick={this.onOpenNavigationBar}
            >
              <i className={`${style.icon} ${style['i-menu-1']}`} />
            </a>
          </div>
          <div className={style['cont-search']}>
            <input
              className={style['e-searchbar']}
              type='search'
              placeholder='Search in the app'
              onFocus={this.onSearchFocus}
              onBlur={this.onSearchBlur}
            />
            <button
              className={`${style['e-searchbtn']} ${style.button} ${
                style.primary
              } ${this.state.showGoButton ? style.show : style.hide}`}
            >
              <span>Go!</span>
            </button>
          </div>
        </div>
        <div
          className={`${style.cell} ${style['medium-2']} ${style['small-12']} ${
            style['text-right']
          }`}
        />
      </div>
    );
  }
}
