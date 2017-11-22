import { unset } from 'cerebral/operators';

module.exports = [
  unset('state:auth.signup.formErrors.email_taken'),
];
