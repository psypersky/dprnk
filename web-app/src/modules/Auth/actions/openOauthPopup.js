import { auth } from '../../../constants';

const debug = require('debug')('app:actions:openOauthPopup');

const providers = {
  twitter: require('twitter-oauth-agent'),
  facebook: require('facebook-oauth-agent'),
  google: require('google-oauth-agent'),
};

function openOauthPopup({ state, input, output }) {
  const { provider } = input;

  if (provider === 'twitter') {
    const twitterToken = state.get(['auth', 'signup', 'twitterToken']);
    providers[provider](twitterToken,
      function handleTwitterOauth(err, code) {
        if (err) {
          debug('Error getting oauth from popup', err);
          return output.error(err);
        }

        debug('Got oauth code from popup', code);
        output.success({ oauthCode: { provider, code } });
      },
    );
  } else {
    providers[provider]({
      client_id: auth.config[provider].client_id,
      redirect_uri: auth.config[provider].redirect_uri,
      scope: 'email',
    }, (err, code) => {
      if (err) {
        debug('Error getting facebook oauth code', err);
        return output.error(err);
      }

      debug('Got oauth code from facebook popup', code);
      output.success({ oauthCode: { provider, code } });
    });
  }
}

openOauthPopup.async = true;
openOauthPopup.outputs = ['success', 'error'];

export default openOauthPopup;
