import React from 'react';
import { connect } from 'cerebral-view-react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import cx from 'classnames';
import _ from 'lodash';
import styles from './styles.scss';
import Oauth from '../../../Oauth';
import formStyles from '../../../../styles/formStyles';
import iconStyles from '../../../../icons/_styles.scss';

export default connect({
  form: 'auth.login.form',
  formErrors: 'auth.login.formErrors',
}, {
  fieldChanged: 'forms.fieldChanged',
  emailLoginFormSubmited: 'auth.emailLoginFormSubmited',
  clearEmailPasswordError: 'auth.emailLoginClearEmailPasswordError',
}, class LoginPage extends React.Component {

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

  handlePasswordFocus = () => {
    if (this.props.formErrors.email_password_invalid) {
      this.props.clearEmailPasswordError();
    }
  }

  handleBlur = (field) => {
    if (!this.state.wasBlured[field]) {
      const newState = _.merge({}, this.state.wasBlured, { [field]: true });
      this.setState({ wasBlured: newState });
    }
  }

  render() {
    const {
      form,
      formErrors,
      emailLoginFormSubmited,
      fieldChanged,
    } = this.props;
    const { wasBlured } = this.state;
    const isFormValid = isValidForm(form);
    const isEmailValid = (
      form.email.isValid ||
      !wasBlured.email ||
      !form.email.value
    );
    const isPasswordValid = (
      !formErrors.email_password_invalid &&
      (form.password.isValid ||
      !wasBlured.password ||
      !form.password.value
      )
    );
    let passwordErrorMsg;
    if (!isPasswordValid) {
      passwordErrorMsg = (
        _.get(formErrors, 'email_password_invalid.message') ||
        _.get(form, 'password.errorMessage')
      );
    }

    const handleLoginClick = e => e.stopPropagation();

    return (
      <div className={styles.wrapper}>
        <div className={styles.inner} onClick={handleLoginClick}>

          <div>
            <h3>Sign into your Ruby Lens account</h3>
          </div>

          {/** TODO: Handle oauth_email_invalid errors **/}
          <div className={styles.socialAuthContainerLogIn}>
            <div>
              <Oauth
                type="login"
                provider="facebook"
                message="Sign in with Facebook"
              />
            </div>
            <div>
              <Oauth
                type="login"
                provider="google"
                message="Sign in with Google"
              />
            </div>
            <div>
              <Oauth
                type="login"
                provider="twitter"
                message="Sign in with Twitter"
              />
            </div>
          </div>

          <div className={styles.formContainerLogIn}>
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
                      field: 'auth.login.form.email',
                      value: e.target.value,
                    })}
                    onBlur={() => this.handleBlur('email')}
                  />
                </div>
                { isEmailValid ? null :
                <p>* {form.email.errorMessage}</p>
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
                      field: 'auth.login.form.password',
                      value: e.target.value,
                    })}
                    onFocus={this.handlePasswordFocus}
                    onBlur={() => this.handleBlur('password')}
                  />
                </div>
                { isPasswordValid ? null :
                <p>* {passwordErrorMsg}</p>
                }
              </fieldset>

              <div className={styles.forgot}>
                <div className={formStyles.checkboxContainer}>
                  <div className={formStyles.squaredFour}>
                    <input
                      type="checkbox"
                      id="squaredFour1"
                    />
                    <label htmlFor="squaredFour1">
                      <p>Remember me</p>
                    </label>
                  </div>
                </div>
                <a href="/password-resets/new">Forgot password?</a>
              </div>
            </form>
          </div>

          <div>
            <button
              className={cx(styles.signInButton, formStyles.buttonRed)}
              disabled={!isFormValid}
              onClick={(e) => {
                e.preventDefault();
                emailLoginFormSubmited();
              }}
            >
              Sign in
            </button>
          </div>

          <div className={styles.notAMemberYet}>
            <a href="/signup">No account? Sign up here</a>
          </div>

        </div>
      </div>
    );
  }

});
