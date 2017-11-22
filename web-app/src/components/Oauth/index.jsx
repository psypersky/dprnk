import React from 'react';
import classNames from 'classnames';
import { connect } from 'cerebral-view-react';
import styles from './styles.scss';
import iconStyles from '../../icons/_styles.scss';

export default connect((props) => {
  if (props.provider === 'twitter') {
    return { twitterToken: 'auth.signup.twitterToken' };
  }
  return {};
}, {
  twitterTokenRequested: 'auth.twitterTokenRequested',
  oauthLoginSubmited: 'auth.oauthLoginSubmited',
  oauthSignupSubmited: 'auth.oauthSignupSubmited',
}, class Oauth extends React.Component {

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    provider: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    twitterToken: React.PropTypes.any,
    twitterTokenRequested: React.PropTypes.func.isRequired,
    oauthLoginSubmited: React.PropTypes.func.isRequired,
    oauthSignupSubmited: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onRequestAuthentication = ::this.onRequestAuthentication;
  }

  componentDidMount() {
    const { twitterTokenRequested, provider } = this.props;
    if (provider === 'twitter') {
      twitterTokenRequested();
    }
  }

  onRequestAuthentication(e) {
    e.preventDefault();
    const {
      provider,
      oauthSignupSubmited,
      oauthLoginSubmited,
      type,
    } = this.props;

    if (type === 'signup') {
      oauthSignupSubmited({ provider });
    } else if (type === 'login') {
      oauthLoginSubmited({ provider });
    }
  }

  render() {
    const { message, provider, twitterToken } = this.props;

    const disabled = (provider === 'twitter' && !twitterToken);

    const className = classNames(styles.button, {
      [styles.facebook]: provider === 'facebook',
      [styles.google]: provider === 'google',
      [styles.twitter]: provider === 'twitter',
    });

    return (
      <button
        onClick={this.onRequestAuthentication}
        target="_self"
        rel="nofollow"
        href="/"
        disabled={disabled}
        className={className}
      >
      <i className={iconStyles[provider]} />
        <span>{message}</span>
      </button>
    );
  }
});
