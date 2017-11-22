import {
  set,
  copy,
} from 'cerebral/operators';

import {
  sendProfileForm,
} from '../actions';

import {
  redirect,
  setTopNotice,
} from '../../../factories/actions';

export default [
  set('state:account.settingsFormErrors', {}),
  sendProfileForm,
  {
    success: [
      setTopNotice({
        message: 'Your account has been updated.',
        type: 'success',
      }),
      copy('input:profile.username', 'state:user.username'),
      copy('input:profile.location', 'state:user.location'),
      copy('input:profile.bio', 'state:user.bio'),
      copy('input:profile.websiteUrl', 'state:user.socialProfiles.website'),
      copy('input:profile.facebookUrl', 'state:user.socialProfiles.facebook'),
      copy('input:profile.twitterUrl', 'state:user.socialProfiles.twitter'),
      copy('input:profile.availableForPainting', 'state:user.available'),
      copy('input:profile.showEmail', 'state:user.show_email'),
    ],
    conflict: [
      copy('input:errors', 'state:account.settingsFormErrors'),
    ],
    error: [
      redirect('/error'),
    ],
  },
];
