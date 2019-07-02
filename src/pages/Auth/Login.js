import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Form, setUser, initAuth } from 'react-formio';
import { push } from 'connected-react-router';
import { AppConfig, AuthConfig } from '../../config';

const Login = class extends Component {
  componentDidMount = () => {
    this.props.initAuth();
  };

  render() {
    console.log(this.props);
    return <Form {...this.props} />;
  }
};

const mapStateToProps = () => {
  return {
    src: AppConfig.projectUrl + '/' + AuthConfig.login.form,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAuth: () => {
      // console.log(info)
      // dispatch(initAuth());
    },
    onSubmitDone: submission => {
      // dispatch(initAuth());
      dispatch(push(AuthConfig.authState));
      dispatch(setUser(submission));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
