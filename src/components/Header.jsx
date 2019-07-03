import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// import NavLink from './NavLink';
import { logout } from 'react-formio';

import history from 'Services/history';

const Header = class extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { auth, logoutAction } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              className="logo"
              alt="Form.io"
              src="https://portal.form.io/images/formio-logo.png"
              height="25px"
            />
          </Link>
          <ul className="nav navbar-nav mr-auto">
            <Link to="/" role="navigation button" className="nav-link">
              <span className="fa fa-home" />
            </Link>
            {auth.authenticated ? (
              <Link to="/event" role="navigation link" className="nav-link">
                <i className="fa fa-calendar" />
                &nbsp; Events
              </Link>
            ) : null}
          </ul>
          <ul className="nav navbar-nav ml-auto">
            {auth.authenticated ? (
              <li className="nav-item">
                <span
                  className="nav-link"
                  role="navigation link"
                  onClick={logoutAction}
                >
                  <span className="fa fa-sign-out" />
                  &nbsp; Logout
                </span>
              </li>
            ) : (
              <Link to="/auth" role="navigation link" className="nav-link">
                Login | Register
              </Link>
            )}
          </ul>
        </div>
      </nav>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.formReducers.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logoutAction: () => {
    dispatch(logout());
    history.push('/auth');
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
