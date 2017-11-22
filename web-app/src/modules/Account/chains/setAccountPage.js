import { set, copy } from 'cerebral/operators';
import validateForm from 'cerebral-module-forms/factories/validateForm';
import setPage from '../../../factories/actions/setPage';

export default [
  // Set user settings form
  copy('state:user.username', 'state:account.settingsForm.username.value'),
  copy('state:user.location', 'state:account.settingsForm.location.value'),
  copy('state:user.bio', 'state:account.settingsForm.bio.value'),
  copy('state:user.socialProfiles.website',
    'state:account.settingsForm.websiteUrl.value'),
  copy('state:user.socialProfiles.facebook',
    'state:account.settingsForm.facebookUrl.value'),
  copy('state:user.socialProfiles.twitter',
    'state:account.settingsForm.twitterUrl.value'),
  copy('state:user.available',
    'state:account.settingsForm.availableForPainting.value'),
  copy('state:user.show_email', 'state:account.settingsForm.showEmail.value'),
  // Clear user settings errors
  set('state:account.settingsFormErrors', {}),
  // Validate user settings form
  validateForm('account.settingsForm'),
  // Clear password form
  set('state.account.passwordForm.oldPassword', ''),
  set('state.account.passwordForm.newPassword', ''),
  // Set page
  setPage('account'),
];
