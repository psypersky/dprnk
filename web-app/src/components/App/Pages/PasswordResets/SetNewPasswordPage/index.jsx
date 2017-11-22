import React from 'react';
import { connect } from 'cerebral-view-react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import styles from './styles.scss';
import formStyles from '../../../../../styles/formStyles';

export default connect({
  form: 'auth.setNewPassword.form',
}, {
  fieldChanged: 'forms.fieldChanged',
  setNewPasswordFormSubmited: 'auth.setNewPasswordFormSubmited',
}, function SetNewPasswordPage(props) {
  const { form, setNewPasswordFormSubmited, fieldChanged } = props;
  const isValid = isValidForm(form);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1>
          <a href="/">
            <img alt="Ruby Lens logo" src="/public/logo/logo-white.png" />
          </a>
        </h1>
        <h2>Reset your password</h2>


        <div className={styles.formContainer}>
          <form className={formStyles.form}>

            <fieldset>
              <label htmlFor="password">
                New password
              </label>
              <input
                name="password"
                type="password"
                className={formStyles.textInput}
                value={form.password.value}
                onChange={(e) => fieldChanged({
                  field: 'auth.setNewPassword.form.password',
                  value: e.target.value,
                })}
              />
              <p className={formStyles.message}>
                Minimum 6 characters
              </p>
            </fieldset>

            <button
              className={formStyles.formSubmit}
              disabled={!isValid}
              onClick={(e) => {
                e.preventDefault();
                setNewPasswordFormSubmited();
              }}
            >
              Reset password
            </button>

          </form>
        </div>

      </div>
    </div>
  );
});
