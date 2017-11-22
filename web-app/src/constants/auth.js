export default {
  config: {
    facebook: {
      client_id: process.env.OAUTH_FACEBOOK_ID,
      redirect_uri: process.env.OAUTH_FACEBOOK_REDIRECT,
    },

    google: {
      client_id: process.env.OAUTH_GOOGLE_ID,
      redirect_uri: process.env.OAUTH_GOOGLE_REDIRECT,
    },
  },
};
