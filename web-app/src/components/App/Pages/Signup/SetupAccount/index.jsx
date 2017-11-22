import React from 'react';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import { connect } from 'cerebral-view-react';
import cx from 'classnames';
import styles from './styles.scss';
import formStyles from '../../../../../styles/formStyles';
import icons from '../../../../../icons/_styles.scss';
import UserImage from '../../../../General/UserImage';

export default connect({
  form: 'auth.signup.setupAccountForm',
  formErrors: 'auth.signup.setupAccountFormErrors',
}, {
  fieldChanged: 'forms.fieldChanged',
  setupAccountFormSubmited: 'auth.setupAccountFormSubmited',
}, class ConfirmOauthPage extends React.Component {

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

  render() {
    const {
      form,
      formErrors,
      fieldChanged,
      setupAccountFormSubmited,
    } = this.props;

    const { wasBlured } = this.state;

    const handleContinueClick = (e) => {
      e.preventDefault();
      setupAccountFormSubmited();
    };

    const isFormValid = isValidForm(form);

    const isUsernameValid = (
      !wasBlured.username ||
      form.username.isValid ||
      !form.username.value
    );

    return (
      <div className={styles.confirmOauth}>
        <div className={styles.header}>
          <p className={styles.logo}>
            <a href="/">
              <img
                alt="Ruby Lens logo"
                src="/public/logo/logo-text-white.svg"
              />
            </a>
          </p>
          <img
            alt="Ruby Lens logo"
            className={styles.ogre}
            src="/public/assets/ogres-1.png"
          />
        </div>

        <div className={styles.message}>
          <span>
            Welcome to the Ruby Lens community!
            Tell us more about yourself. (Step 2 of 3)
          </span>
        </div>

        <div className={styles.inner}>
          <div className={styles.constrainedContent}>
            <div className={styles.background}>
              <div className={styles.backgroundText}>
                <p>Welcome to the Ruby Lens community!<br />
                  Tell us more about yourself. (Step 2 of 3)
                </p>
              </div>
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
                        field: 'auth.signup.setupAccountForm.username',
                        value: e.target.value,
                      })}
                      onBlur={() => this.handleBlurChange('username')}
                    />
                    { isUsernameValid ? null :
                    <p>{form.username.errorMessage}</p>
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
                        field: 'auth.signup.setupAccountForm.location',
                        value: e.target.value,
                      })}
                      onBlur={() => this.handleBlurChange('location')}
                    />
                    <div className={styles.iconContainer}>
                      <i className={icons.map_marker} />
                    </div>
                  </div>
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
                        field: 'auth.signup.setupAccountForm.bio',
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
                        field: 'auth.signup.setupAccountForm.websiteUrl',
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
                        field: 'auth.signup.setupAccountForm.facebookUrl',
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
                        field: 'auth.signup.setupAccountForm.twitterUrl',
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
                            'auth.signup.setupAccountForm.availableForPainting',
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
                            field: 'auth.signup.setupAccountForm.showEmail',
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
              </form>
            </div>
            <div className={styles.buttonsContainer}>
              <a href="/">Back</a>
              <button
                className={cx(formStyles.buttonRed, styles.buttonContinue)}
                onClick={handleContinueClick}
                disabled={!isFormValid}
              >
              Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
