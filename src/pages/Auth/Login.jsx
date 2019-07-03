import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Form, setUser, initAuth } from 'react-formio';
import { AppConfig, AuthConfig } from '../../config';

const Login = class extends Component {
  componentDidMount = () => {
    this.props.initAuth();
  };

  render() {
    return <Form {...this.props} />;
  }
};

const mapStateToProps = () => ({
  src: AppConfig.projectUrl + '/' + AuthConfig.login.form
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initAuth: () => {
    // dispatch(initAuth());
  },
  onSubmitDone: submission => {
    ownProps.history.push(AuthConfig.authState);
    dispatch(setUser(submission));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
