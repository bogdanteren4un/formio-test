import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectRoot,
  saveSubmission,
  Form,
  selectError,
  Errors,
  getForm,
} from 'react-formio';
import { push } from 'connected-react-router';
import Loading from '../../components/Loading';

const View = class extends Component {
  componentDidMount() {
    this.props.getForm();
  }

  state = {
    fildsetArr: [],
  };

  onSubmitHandle = submission => {
    const {
      form: { form },
      onSubmit,
    } = this.props;

    if (Object.entries(form).length !== 0) {
      const excludes = [];
      let sum = 0;
      let fieldset;

      const submData = Object.keys(submission.data).filter(
        key => submission.data[key].length !== 0
      );

      const findFieldsetByKey = (key, root) => {
        try {
          root.components.forEach(component => {
            if (component.key === key && root.type !== 'form') {
              throw root;
            }
          });

          root.components.forEach(component => {
            if (component.type === 'fieldset') {
              const temp = findFieldsetByKey(key, component);
              if (temp) {
                throw temp;
              }
            }
          });
          return undefined;
        } catch (fieldset) {
          return fieldset;
        }
      };

      submData.forEach(key => {
        if (!excludes.includes(key)) {
          fieldset = findFieldsetByKey(key, form);
          if (fieldset) {
            fieldset.components.forEach(component => {
              if (component.hidden && component.defaultValue !== '') {
                if (!isNaN(Number(component.defaultValue))) {
                  sum += +component.defaultValue;
                }
              }
              if (component.type !== 'fieldset') {
                excludes.push(component.key);
              }
            });
          }
        }
      });
    }

    onSubmit(submission);
  };

  render() {
    const {
      hideComponents,
      errors,
      options,
      form: { form, isActive, url },
    } = this.props;

    console.log('OUTPUT ==>: extends -> render -> this.props', this.props);
    if (isActive) {
      return <Loading />;
    }

    return (
      <>
        <h3>New {form.title}</h3>
        <Errors errors={errors} />
        <Form
          form={form}
          url={url}
          options={options}
          onSubmit={this.onSubmitHandle}
          hideComponents={hideComponents}
        />
      </>
    );
  }
};

const mapStateToProps = state => {
  const submission = selectRoot(
    'submission',
    selectRoot('demographics', state)
  );

  return {
    form: selectRoot('form', selectRoot('demographics', state)),
    submission: submission.submission,
    errors: [
      selectError('form', selectRoot('demographics', state)),
      selectError('submission', selectRoot('demographics', state)),
    ],
    options: {
      noAlerts: true,
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getForm: () => dispatch(getForm('demographics')),
    onSubmit: submission => {
      dispatch(
        saveSubmission('demographics', submission, null, (err, submission) => {
          if (!err) {
            // dispatch(resetSubmissions('demographics'));
            dispatch(push(`/event`));
          }
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
