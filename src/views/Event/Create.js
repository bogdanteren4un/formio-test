import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import {selectRoot, resetSubmissions, saveSubmission, Form, selectError, Errors, getForm} from 'react-formio';
import {push} from 'connected-react-router';
import Loading from '../../containers/Loading';

const View = class extends Component {
  componentDidMount() {
    this.props.getForm();
  }

  state = {
    fildsetArr: []
  }

  checkHiddenFields = (fieldSet, num, submission) => {
    // console.log('OUTPUT ==>: extends -> checkHiddenFields -> submission', submission);

    const submData = Object.entries(submission.data);
    let field;
    submData.forEach(item => {
      // console.log(item)
      if ((item[0] !== 'firstName' && item[0] !== 'lastName' && item[0] !== 'select' && item[0] !== 'submit') && item[1].length !== 0 ) {
        console.log('OUTPUT ==>: extends -> checkHiddenFields -> item', item)
        console.log('OUTPUT ==>: extends -> checkHiddenFields -> fieldSet', fieldSet)
      }
    })

    const { components } = this.props.form.form;
    // console.log('OUTPUT ==>: extends -> checkHiddenFields -> fieldSet', fieldSet, num);

    
    const sets = fieldSet.components.filter(item => item.type === 'fieldset');
    if (sets.length !== 0) {
      ++num;
      sets.forEach(item => {
        this.checkHiddenFields(item, num, submission)
      })
    }
    else {
      return
    }
    

    // components.forEach(item => {
    //   if (item.key.includes('fieldset')) {
    //     const {components} = item;
    //     components.forEach(itm => {
    //       if (itm.hidden === true) {
    //         console.log(infa)
    //         console.log(itm)
    //       }
    //     })
    //   }
    // })
  }

  onSubmitHandle = (submission) => {
    const { form: { form }, onSubmit } = this.props;

    if (Object.entries(form).length !== 0) {
  
      const fildsetArr = form.components.filter(item => item.type === 'fieldset');
      // this.checkHiddenFields(submission.data);

      fildsetArr.forEach(item => {
        this.checkHiddenFields(item, 0, submission);
      })
    }

    onSubmit(submission);
    
  }



  render() {
    const {
      hideComponents,
      onSubmit,
      errors,
      options,
      form: {form, isActive, url}
    } = this.props;
    // console.log('OUTPUT ==>: extends -> render -> this.props', this.props);
    // console.log('OUTPUT ==>: extends -> render -> form', form)




    if (isActive) {
      return <Loading />;
    }

    return (
      <div>
        <h3>New { form.title }</h3>
        <Errors errors={errors} />
        <Form
          form={form}
          url={url}
          options={options}
          onSubmit={this.onSubmitHandle}
          hideComponents={hideComponents}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  const submission = selectRoot('submission', selectRoot('demographics', state));

  return {
    form: selectRoot('form', selectRoot('demographics', state)),
    submission: submission.submission,
    errors: [
      selectError('form', selectRoot('demographics', state)),
      selectError('submission', selectRoot('demographics', state)),
    ],
    options: {
      noAlerts: true
    },
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getForm: () => dispatch(getForm('demographics')),
    onSubmit: (submission) => {
      dispatch(saveSubmission('demographics', submission, null, (err, submission) => {
        if (!err) {
          // dispatch(resetSubmissions('demographics'));
          dispatch(push(`/event`))
        }
      }));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
