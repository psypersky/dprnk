import React from 'react';
import { connect } from 'cerebral-view-react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import cx from 'classnames';
import _ from 'lodash';
import Oauth from '../../../../Oauth';
import styles from './styles.scss';
import iconStyles from '../../../../../icons/_styles.scss';
import formStyles from '../../../../../styles/formStyles.scss';

export default connect({
  form: 'auth.signup.form',
  formErrors: 'auth.signup.formErrors',
}, {
  fieldChanged: 'forms.fieldChanged',
  emailSignupFormSubmited: 'auth.emailSignupFormSubmited',
  clearEmailTakenError: 'auth.emailSignupClearTakenError',
}, class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wasBlured: {
        email: false,
        password: false,
        passwordConfirm: false,
      },
    };
  }

  handleBlur = (field) => {
    if (!this.state.wasBlured[field]) {
      const newState = _.merge({}, this.state.wasBlured, { [field]: true });
      this.setState({ wasBlured: newState });
    }
  }

  handleEmailFocus = () => {
    if (this.props.formErrors.email_taken) {
      this.props.clearEmailTakenError();
    }
  }

  // Avoid click reaching modal
  handleSignupClick = e => e.stopPropagation();

  render() {
    const {
      form,
      formErrors,
      fieldChanged,
      emailSignupFormSubmited,
    } = this.props;
    const { wasBlured } = this.state;

    const isValid = isValidForm(form);
    const isEmailValid = (
      !formErrors.email_taken &&
      (!wasBlured.email ||
      form.email.isValid ||
      !form.email.value)
    );
    let emailErrorMsg;
    if (!isEmailValid) {
      emailErrorMsg = (
        _.get(formErrors, 'email_taken.message') ||
        _.get(form, 'email.errorMessage')
      );
    }
    const isPasswordValid = (
      !wasBlured.password ||
      form.password.isValid ||
      !form.password.value
    );
    const isPasswordConfirmValid = (
      !wasBlured.passwordConfirm ||
      form.passwordConfirm.isValid ||
      !form.passwordConfirm.value
    );

    return (
      <div className={styles.wrapper}>
        <div className={styles.inner} onClick={this.handleSignupClick}>

          {/** TODO: Handle user_already_registered **/}
          <div className={styles.socialAuthContainer}>
            <h2>Create your FREE account in seconds!</h2>
            <div>
              <Oauth
                type="signup"
                provider="facebook"
                message="Sign up with Facebook"
              />
            </div>
            <div>
              <Oauth
                type="signup"
                provider="google"
                message="Sign up with Google"
              />
            </div>
            <div>
              <Oauth
                type="signup"
                provider="twitter"
                message="Sign up with Twitter"
              />
            </div>
          </div>

          <div className={styles.formContainer}>
            <span>
              or
            </span>
            <form>
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
                    type="email"
                    placeholder="Email address"
                    value={form.email.value}
                    onChange={e => fieldChanged({
                      field: 'auth.signup.form.email',
                      value: e.target.value,
                    })}
                    onFocus={this.handleEmailFocus}
                    onBlur={() => this.handleBlur('email')}
                  />
                </div>
                { isEmailValid ? null :
                <p>{emailErrorMsg}</p>
                }
              </fieldset>
              <fieldset>
                <div
                  className={cx(
                      styles.inputContainer,
                      isPasswordValid ? null : styles.inputError)}
                >
                  <div className={styles.iconContainer}>
                    <i className={iconStyles.lock} />
                  </div>
                  <input
                    placeholder="Password"
                    type="password"
                    value={form.password.value}
                    onChange={e => fieldChanged({
                      field: 'auth.signup.form.password',
                      value: e.target.value,
                    })}
                    onBlur={() => this.handleBlur('password')}
                  />
                </div>
                { isPasswordValid ? null :
                <p>* {form.password.errorMessage}</p>
                }
              </fieldset>
              <fieldset>
                <div
                  className={cx(
                      styles.inputContainer,
                      isPasswordConfirmValid ? null : styles.inputError)}
                >
                  <div className={styles.iconContainer}>
                    <i className={iconStyles.lock} />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={form.passwordConfirm.value}
                    onChange={e => fieldChanged({
                      field: 'auth.signup.form.passwordConfirm',
                      value: e.target.value,
                    })}
                    onBlur={() => this.handleBlur('passwordConfirm')}
                  />
                </div>
                { isPasswordConfirmValid ? null
                : <p>* {form.passwordConfirm.errorMessage}</p>
                }
              </fieldset>
              <button
                className={formStyles.buttonRed}
                disabled={!isValid}
                onClick={(e) => {
                  e.preventDefault();
                  emailSignupFormSubmited();
                }}
              >
                Sign up
              </button>
            </form>
          </div>

          <div className={styles.alreadyAMember}>
            <a href="/login">Already have an account? Sign in here</a>
          </div>

        </div> {/** inner **/}
      </div>
    );
  }

});
