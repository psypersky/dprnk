import React from 'react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import { connect } from 'cerebral-view-react';
import cx from 'classnames';
import styles from './styles';
import UserImage from '../../../../../General/UserImage';
import formStyles from '../../../../../../styles/formStyles';
import icons from '../../../../../../icons/_styles.scss';

export default connect({
  user: 'user',
  form: 'account.settingsForm',
  formErrors: 'account.settingsFormErrors',
}, {
  fieldChanged: 'forms.fieldChanged',
  profileFormSubmited: 'account.profileFormSubmited',
  clearEmailTakenError: 'account.emailSettingsClearTakenError',
}, class AccountSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wasBlured: {
        username: false,
        location: false,
      },
    };
  }

  handleBlurChange = (field) => {
    if (!this.state.wasBlured[field]) {
      this.setState({
        wasBlured: {
          [field]: true,
        },
      });
    }
  }

  handleSubmitClick = (e) => {
    e.preventDefault();
    window.scroll(0, 0);
    this.props.profileFormSubmited();
  }

  handleEmailFocus = () => {
    if (this.props.formErrors.username_taken) {
      this.props.clearEmailTakenError();
    }
  }

  render() {
    const {
      form,
      formErrors,
      fieldChanged,
    } = this.props;

    const { wasBlured } = this.state;

    const isFormValid = isValidForm(form);

    let isUsernameValid = (
      !wasBlured.username ||
      form.username.isValid ||
      !form.username.value
    );

    let usernameError = form.username.errorMessage;

    if (formErrors.username_taken) {
      isUsernameValid = false;
      usernameError = formErrors.username_taken.message;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.responsiveBbackground}>
          <h2>Account Settings</h2>
          <div className={styles.photoContainer}>
            <UserImage />
          </div>
        </div>

        <div className={styles.settingsContainer}>
          <h2>Account Settings</h2>
          <form>
            <fieldset
              className={isUsernameValid ? null : styles.fieldsetError}
            >
              <label htmlFor="username">
                USERNAME*
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="username"
                  className={cx(formStyles.textInput, styles.textInput)}
                  value={form.username.value}
                  onChange={e => fieldChanged({
                    field: 'account.settingsForm.username',
                    value: e.target.value,
                  })}
                  onFocus={this.handleEmailFocus}
                  onBlur={() => this.handleBlurChange('username')}
                />
                { isUsernameValid ? null :
                <p>{usernameError}</p>
                }
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="location">
                LOCATION(optional)
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="location"
                  className={cx(formStyles.textInput, styles.textInput)}
                  value={form.location.value}
                  onChange={e => fieldChanged({
                    field: 'account.settingsForm.location',
                    value: e.target.value,
                  })}
                  onBlur={() => this.handleBlurChange('location')}
                />
                <div className={styles.iconContainer}>
                  <i className={icons.map_marker} />
                </div>
              </div>
              { !(wasBlured.location && !form.location.isValid) ? null :
              <p>{form.location.errorMessage}</p>
              }
            </fieldset>

            <fieldset>
              <label htmlFor="bio">
                BIO (optional)
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="bio"
                  className={cx(formStyles.textInput, styles.textInput)}
                  value={form.bio.value}
                  onChange={e => fieldChanged({
                    field: 'account.settingsForm.bio',
                    value: e.target.value,
                  })}
                />
                <div className={styles.iconContainer}>
                  <i className={icons.account} />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="websiteUrl">
                WEBSITE URL (optional)
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="websiteUrl"
                  className={cx(formStyles.textInput, styles.textInput)}
                  value={form.websiteUrl.value}
                  onChange={e => fieldChanged({
                    field: 'account.settingsForm.websiteUrl',
                    value: e.target.value,
                  })}
                />
                <div className={styles.iconContainer}>
                  <i className={icons.web} />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="facebookUrl">
                FACEBOOK URL (optional)
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="facebookUrl"
                  className={cx(formStyles.textInput, styles.textInput)}
                  value={form.facebookUrl.value}
                  onChange={e => fieldChanged({
                    field: 'account.settingsForm.facebookUrl',
                    value: e.target.value,
                  })}
                />
                <div className={styles.iconContainer}>
                  <i className={icons.facebook} />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="twitterUrl">
                TWITTER URL (optional)
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="twitterUrl"
                  className={cx(formStyles.textInput, styles.textInput)}
                  value={form.twitterUrl.value}
                  onChange={e => fieldChanged({
                    field: 'account.settingsForm.twitterUrl',
                    value: e.target.value,
                  })}
                />
                <div className={styles.iconContainer}>
                  <i className={icons.twitter} />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div
                className={cx(
                  formStyles.checkboxContainer,
                  styles.innerCheckboxContainer)}
              >
                <div className={formStyles.squaredFour}>
                  <input
                    type="checkbox"
                    id="availableForPainting"
                    checked={form.availableForPainting.value}
                    onChange={(e) => {
                      this.props.fieldChanged({
                        field:
                        'account.settingsForm.availableForPainting',
                        value: e.target.checked,
                      });
                    }}
                  />
                  <label htmlFor="availableForPainting">
                    <p>I&apos;m available for painting commision work.</p>
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div
                className={cx(
                  formStyles.checkboxContainer,
                  styles.innerCheckboxContainer)}
              >
                <div className={formStyles.squaredFour}>
                  <input
                    type="checkbox"
                    id="showEmail"
                    checked={form.showEmail.value}
                    onChange={(e) => {
                      this.props.fieldChanged({
                        field: 'account.settingsForm.showEmail',
                        value: e.target.checked,
                      });
                    }}
                  />
                  <label htmlFor="showEmail">
                    <p>Show my email on my profile.</p>
                  </label>
                </div>
              </div>
            </fieldset>

            <div className={styles.submitContainer}>
              <button
                className={cx(formStyles.buttonRed, styles.buttonSubmit)}
                onClick={this.handleSubmitClick}
                disabled={!isFormValid}
              >
              Save
              </button>
              <a href="/" className={styles.buttonCancel}>
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

});
