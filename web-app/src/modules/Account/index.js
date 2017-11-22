import {
  setAccountPage,
  submitProfileForm,
  submitPasswordForm,
  // submitProfileImageRemove,
  setProfileImageUploading,
  setProfileImage,
  setProfileImageError,
  clearSettingsEmailTakenError,
  submitDeleteAccount,
} from './chains';

export default (module) => {
  module.addSignals({
    setAccountPage,
    profileFormSubmited: submitProfileForm,
    // profileImageRemoveSubmited: submitProfileImageRemove,
    profileImageUploading: setProfileImageUploading,
    profileImageSuccess: setProfileImage,
    profileImageError: setProfileImageError,
    emailSettingsClearTakenError: clearSettingsEmailTakenError,
    passwordFormSubmited: submitPasswordForm,
    deleteAccountSubmited: submitDeleteAccount,
  });
};
