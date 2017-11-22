import React from 'react';
import { connect } from 'cerebral-view-react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import cx from 'classnames';
import _ from 'lodash';
import styles from './styles';
import iconStyles from '../../../../../../icons/_styles.scss';
import formStyles from '../../../../../../styles/formStyles.scss';

export default connect({
  form: 'account.passwordForm',
}, {
  fieldChanged: 'forms.fieldChanged',
  passwordFormSubmited: 'account.passwordFormSubmited',
}, class AccountPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wasBlured: {
        oldPassword: false,
        newPassword: false,
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
    const { wasBlured } = this.state;
    const {
      form,
      fieldChanged,
      passwordFormSubmited,
    } = this.props;

    const isValid = isValidForm(form);

    const isOldPasswordValid = (
      !wasBlured.oldPassword ||
      form.oldPassword.isValid ||
      !form.oldPassword.value
    );

    const isNewPasswordValid = (
      !wasBlured.newPassword ||
      form.newPassword.isValid ||
      !form.newPassword.value
    );

    return (
      <div className={styles.wrapper}>
        <form className={styles.form}>

          <h2>Change password</h2>
          <fieldset>
            <label htmlFor="changeOldPassword">
              CURRENT PASSWORD
            </label>
            <div
              className={cx(
                styles.inputContainer,
                isOldPasswordValid ? null : styles.inputError)}
            >
            <input
              type="password"
              id="changeOldPassword"
              value={form.oldPassword.value}
              onChange={e => fieldChanged({
                field: 'account.passwordForm.oldPassword',
                value: e.target.value,
              })}
              onBlur={() => this.handleBlur('oldPassword')}
              />
              <div className={styles.iconContainer}>
                <i className={iconStyles.lock} />
              </div>
            </div>
            { isOldPasswordValid ? null :
            <p>* {form.oldPassword.errorMessage}</p>
            }
          </fieldset>

          <fieldset>
            <label htmlFor="changeNewPassword">
              NEW PASSWORD
            </label>
            <div
              className={cx(
                styles.inputContainer,
                isNewPasswordValid ? null : styles.inputError)}
            >
            <input
              type="password"
              id="changeNewPassword"
              value={form.newPassword.value}
              onChange={e => fieldChanged({
                field: 'account.passwordForm.newPassword',
                value: e.target.value,
              })}
              onBlur={() => this.handleBlur('newPassword')}
              />
              <div className={styles.iconContainer}>
                <i className={iconStyles.lock} />
              </div>
            </div>
            { isNewPasswordValid ? null :
            <p>* {form.newPassword.errorMessage}</p>
            }
          </fieldset>

          <div className={styles.submitContainer}>
            <button
              className={cx(formStyles.buttonRed, styles.buttonSubmit)}
              disabled={!isValid}
              onClick={(e) => {
                e.preventDefault();
                window.scroll(0, 0);
                passwordFormSubmited();
              }}
            >
              Save
            </button>
            <a href="/" className={styles.buttonCancel}>
              Cancel
            </a>
          </div>

        </form>
      </div>
    );
  }
});
