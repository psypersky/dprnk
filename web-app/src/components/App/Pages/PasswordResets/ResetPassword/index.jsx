import React from 'react';
import { connect } from 'cerebral-view-react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import cx from 'classnames';
import _ from 'lodash';
import styles from './styles.scss';
import formStyles from '../../../../../styles/formStyles';
import iconStyles from '../../../../../icons/_styles.scss';

export default connect({
  form: 'auth.resetPassword.form',
}, {
  fieldChanged: 'forms.fieldChanged',
  resetPasswordFormSubmited: 'auth.resetPasswordFormSubmited',
}, class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wasBlured: {
        email: false,
      },
    };
  }

  handleBlur = (field) => {
    if (!this.state.wasBlured[field]) {
      const newState = _.merge({}, this.state.wasBlured, { [field]: true });
      this.setState({ wasBlured: newState });
    }
  }

  render() {
    const { form, resetPasswordFormSubmited, fieldChanged } = this.props;
    const { wasBlured } = this.state;
    const isValid = isValidForm(form);

    const isEmailValid = (
      form.email.isValid ||
      !wasBlured.email ||
      !form.email.value
    );

    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <h2>Lost your password? <span className={styles.hidden}>No problem.</span></h2>

          <p>
            Enter your email below and we’ll send you a shiney new one.
            <br />
            You can change this in your account settings afterwards.
          </p>
          <div className={styles.lockContainer}>
            <img
              src="/public/assets/locked.svg"
              alt="Icon Lock"
            />
          </div>
          <div className={styles.formContainer}>
            <form className={formStyles.inlineForm}>

              <fieldset>
                <div
                  className={cx(
                      styles.inputContainer,
                      isEmailValid ? null : styles.inputError)}
                >
                  <div className={styles.iconContainer}>
                    <i className={iconStyles.email_outline} />
                  </div>
                  <input
                    placeholder="Email address"
                    value={form.email.value}
                    onChange={e => fieldChanged({
                      field: 'auth.resetPassword.form.email',
                      value: e.target.value,
                    })}
                    onBlur={() => this.handleBlur('email')}
                  />
                  { isEmailValid ? null :
                  <p>* {form.email.errorMessage}</p>
                  }
                </div>
              </fieldset>
              <div className={styles.buttonsContainer}>
                <a href="/">Back</a>
                <button
                  className={cx(formStyles.buttonRed, styles.button)}
                  disabled={!isValid}
                  onClick={(e) => {
                    e.preventDefault();
                    resetPasswordFormSubmited();
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
