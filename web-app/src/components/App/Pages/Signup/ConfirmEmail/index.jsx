import React from 'react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import { connect } from 'cerebral-view-react';
import styles from './styles.scss';

export default connect({
  form: 'auth.signup.confirmForm',
}, {
  fieldChanged: 'forms.fieldChanged',
  emailConfirmFormSubmited: 'auth.emailConfirmFormSubmited',
}, function ConfirmPage({
  form,
  fieldChanged,
  emailConfirmFormSubmited }) {
  const isValid = isValidForm(form);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.constrainedContent}>
          <div className={styles.main}>

            <div className={styles.full}>
              <h1 className={styles.alt}>Craft your password...</h1>
            </div>

            <form className={styles.form}>
              <div className={styles.formField}>
                <fieldset>
                  <label htmlFor="password">
                    Like an dark assassin in the night,
                    your password will not be seen by anyone.
                  </label>
                  <input
                    type="password"
                    value={form.password.value}
                    onChange={(e) => fieldChanged({
                      field: 'auth.signup.confirmForm.password',
                      value: e.target.value,
                    })}
                  />
                  <p className={styles.message}>Minimum 6 characters</p>
                </fieldset>
              </div>

              <div className={styles.formButtons}>
                <button
                  disabled={!isValid}
                  className={styles.formSubmit}
                  onClick={(e) => {
                    e.preventDefault();
                    emailConfirmFormSubmited();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
});
