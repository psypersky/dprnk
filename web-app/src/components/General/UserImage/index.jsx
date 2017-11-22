import React from 'react';
import { connect } from 'cerebral-view-react';
import { FileUpload } from 'cerebral-module-http';
import DropZone from 'react-dropzone';
import styles from './styles';
import icons from '../../../icons/_styles.scss';
import { BUCKET_URL } from '../../../../config/aws';

const debug = require('debug')('app:general:UserImage');

export default connect({
  imageState: 'uploadImageComponent',
  user: 'user',
}, {
  profileImageUploading: 'account.profileImageUploading',
  profileImageSuccess: 'account.profileImageSuccess',
  profileImageError: 'account.profileImageError',
}, class UserImage extends React.Component {

  handleImgDrop = (files) => {
    const file = files[0];

    const imageType = /^image\//;
    if (!imageType.test(file.type)) {
      alert('Please select only images');
      return;
    }

    debug(`uploading profile user's image`, file);

    const fileUpload = new FileUpload({
      url: '/api/account/update-profile-image',
      name: 'img',
    });

    this.props.profileImageUploading();
    fileUpload.send(file)
    .then(this.props.profileImageSuccess)
    .catch(this.props.profileImageError);

    this.setState({ imgFile: file });
  }

  render() {
    const { imageState, user, showMsg } = this.props;

    if (user && user.image && !imageState.uploading) {
      return (
        <div className={styles.profilePhoto}>
          <DropZone
            className={styles.dropZone}
            onDrop={this.handleImgDrop}
          >
            <div className={styles.profilePhotoNoMargin}>
              <img
                alt="user"
                src={`${BUCKET_URL}/users/avatars/${user.image}`}
              />
            </div>
            { !showMsg ? null :
            <span className={styles.clickToUpload}>
              Click to upload a new photo
            </span>
            }
          </DropZone>
        </div>
      );
    }

    if (imageState.uploading) {
      return (
        <div className={styles.profilePhoto}>
          <div className={styles.profilePhotoMargin}>
            <span />
            <span>Uploading image...</span>
          </div>
        </div>
      );
    }

    /** No image not uploading **/
    return (
      <div className={styles.profilePhoto}>
        <DropZone
          className={'styles.dropZone'}
          onDrop={this.handleImgDrop}
        >
          <div className={styles.profilePhotoMargin}>
            <i className={icons.upload} />
            <span>Profile</span>
            <span>photo</span>
          </div>
        </DropZone>
      </div>
    );
  }
});
