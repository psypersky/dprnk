import React from 'react';
import DropZone from 'react-dropzone';
import Select from 'react-select';
import { connect } from 'cerebral-view-react';
import { FileUpload } from 'cerebral-module-http';
import isValidForm from 'cerebral-module-forms/helpers/isValidForm';
import shortId from 'shortid';
import cx from 'classnames';
import _ from 'lodash';
import 'react-select/dist/react-select.css';
import styles from './styles';
import icons from '../../../../../icons/_styles';
import formStyles from '../../../../../styles/formStyles';

const debug = require('debug')('app:shots:new');
// const inspect = require('util-inspect');

const MAX_ATTACHMENT_FILES = 5;

export default connect({
  form: 'shots.newShot.form',
  games: 'config.games',
}, {
  fieldChanged: 'forms.fieldChanged',
  shotImgSubmitStarted: 'shots.shotImgSubmitStarted',
  shotImgSubmited: 'shots.shotImgSubmited',
  shotImgSubmitFailed: 'shots.shotImgSubmitFailed',
  shotAttachmentsSubmitStarted: 'shots.shotAttachmentsSubmitStarted',
  shotAttachmentsSubmited: 'shots.shotAttachmentsSubmited',
  shotAttachmentsFailed: 'shots.shotAttachmentsFailed',
  shotSubmited: 'shots.shotSubmited',
}, class NewShotPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imgFile: {},
      attachmentFiles: new Map(),
      wasBlured: {
        title: false,
        game: false,
        army: false,
      },
    };
  }

  // Upload main image
  handleImgDrop = (files) => {
    const file = files[0];

    const imageType = /^image\//;
    if (!imageType.test(file.type)) {
      alert('Please select only images');
      return;
    }

    debug(`uploading shot's main image`, file);

    const fileUpload = new FileUpload({
      url: '/api/shots/upload-shot-image',
      name: 'img',
      data: {
        type: 'shot',
      },
    });

    this.props.shotImgSubmitStarted();
    fileUpload.send(file)
      .then(this.props.shotImgSubmited)
      .catch(this.props.shotImgSubmitFailed);

    this.setState({ imgFile: file });
  }

  handleUploadAtachments = (e) => {
    const { attachmentFiles } = this.state;
    const targetFiles = e.target.files;
    const imageType = /^image\//;

    for (let i = 0;
      (
        (i < targetFiles.length) &&
        (attachmentFiles.size < MAX_ATTACHMENT_FILES)
      );i++) {
      if (!imageType.test(targetFiles[i].type)) continue;

      const fileState = {
        data: targetFiles[i],
        preview: null,
        url: null,
        isUploading: true,
        hasError: false,
        fileUpload: new FileUpload({
          url: '/api/shots/upload-shot-image',
          name: 'img',
          data: {
            type: 'attachment',
          },
        }),
        reader: new FileReader(),
      };

      fileState.reader.onload = (onloadEvent) => {
        fileState.preview = onloadEvent.target.result;
        this.forceUpdate();
      };
      fileState.reader.readAsDataURL(fileState.data);

      fileState.fileUpload.send(fileState.data)
        .then((data) => {
          debug('attachment upload complete', data);
          fileState.isUploading = false;
          fileState.imgName = data.result.imgName;
          const attachmentsUrls = Array.from(attachmentFiles)
          .map(([key, state]) => {
            if (!state.isUploading && !state.hasError) {
              return state.imgName;
            }
          });
          debug('attachmentsUrls', attachmentsUrls);
          this.props.fieldChanged({
            field: 'shots.newShot.form.attachmentsImgs',
            value: attachmentsUrls,
          });
        })
        .catch((uploadError) => {
          debug('error uploading attachment', uploadError);
          fileState.hasError = true;
          this.forceUpdate();
        });

      attachmentFiles.set(shortId.generate(), fileState);
    }

    this.setState({ attachmentFiles });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.shotSubmited();
  }

  handleInputChange = (name) => {
    return (e) => {
      this.props.fieldChanged({
        field: `shots.newShot.form.${name}`,
        value: e.target.value,
      });
    };
  }

  handleBlur = (field) => {
    if (!this.state.wasBlured[field]) {
      const newState = _.merge({}, this.state.wasBlured, { [field]: true });
      this.setState({ wasBlured: newState });
    }
  }

  render() {
    const {
      form,
      games,
      fieldChanged,
    } = this.props;
    const {
      imgFile,
      attachmentFiles,
      // wasBlured,
    } = this.state;
    const isValid = isValidForm(form) && form.shotImg.value;

    // const isTitleValid = (
    //   form.title.isValid ||
    //   !wasBlured.title
    //   // !form.title.value
    // );
    // const isGameValid = form.game.isValid && !wasBlured.game;
    // const isArmyValid = form.army.isValid && !wasBlured.army;

    const isTitleValid = true;
    const isGameValid = true;
    const isArmyValid = true;

    const showUploadAttachments = (
      form.shotImg.value &&
      attachmentFiles.size < MAX_ATTACHMENT_FILES
    );

    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div
            className={cx(
              styles.shotContainer,
              form.shotImgUploading.value ? styles.shotUploading : null,
              form.shotImg.value ? styles.shotUploaded : null)}
          >

            {/** Main image box **/}
            <div className={styles.shotContent}>
              <div className={styles.shotImg}>
                { !form.shotImgUploading.value ? null :
                <div className={styles.loadingContainer}>
                  <img
                    alt="loading-circle"
                    className={styles.loadingCircle}
                    src="/public/logo/logo-circle-white-trans.svg"
                  />
                  <span>Loading...</span>
                </div>
                }
                { imgFile.preview
                  ? <img
                    className={styles.imgPreview}
                    src={imgFile.preview}
                    alt="shot"
                  />
                  : <DropZone
                    className={styles.dropZone}
                    onDrop={this.handleImgDrop}
                  >
                    <h3>
                      { form.shotImgUploading.value
                      ? 'Wait a second, your shot is being uploaded'
                      : <span>
                        <i className={icons.upload} />
                        <span className={styles.uploadText} />
                      </span>
                      }
                    </h3>
                    { form.shotImgUploading.value ? null :
                    <p>
                      <span className={styles.uploadClick}>
                        Or,&nbsp;
                        <span className={styles.redLink}>click here</span>
                        &nbsp;to select an image files. <br />
                      </span>
                      The bigger, the better!
                      Max file size is a massive 100MB.
                    </p>
                    }
                  </DropZone>
                }
              </div>
            </div>

            {/** Thumbnail images **/}
            <div className={styles.thumbnailBox}>
              <ul className={styles.thumbnails}>
                {
                  Array.from(attachmentFiles).map(([key, file]) => {
                    return (
                      <li key={key} >
                        <div className={styles.thumbnailContainer}>
                          <figure
                            className={file.isUploading ? styles.uploading : ""}
                            style={{ backgroundImage: `url(${file.preview})` }}
                          />
                          { !file.isUploading ? null :
                          <div className={styles.loadingContainerThumb}>
                            <img
                              alt="loading-circle"
                              className={styles.loadingCircleThumb}
                              src="/public/logo/logo-circle-white-trans.svg"
                            />
                            <span>Loading...</span>
                          </div>
                          }
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>

            {/** Upload attachments **/}
            { !showUploadAttachments ? null :
            <div className={styles.backgroundContainer}>
              <div className={styles.uploadAttachmentContainer}>
                <div className={styles.uploadAttachments}>
                  {form.attachmentsImgsUploading.value
                    ? <span className={styles.uploadingMsg}>
                      Uploading attachments...
                    </span>
                    : <form className={styles.attachmentsForm}>
                      <label htmlFor="attachmentsInput">
                        <i className={icons.upload} /> <br />
                        <span>
                          <p className={styles.attachmentsUploadText} />
                          <br />
                          <span className={styles.attachmentsClickHere}>
                            Or
                            <span className={styles.clickHere}>click here</span>
                            to select your image files. <br />
                          </span>
                          The bigger, the better! Max
                          file size is a massive 100MB
                        </span>
                        <input
                          id="attachmentsInput"
                          type="file"
                          multiple
                          onChange={this.handleUploadAtachments}
                        />
                      </label>
                    </form>
                  }
                </div>
              </div>
            </div>
            }

          </div>

          {/** Right form text fields **/}
          <div className={styles.shotFormContainer}>
            <form
              className={formStyles.form}
              onSubmit={this.handleFormSubmit}
            >

              <fieldset
                className={cx(styles.Title,
                isTitleValid ? null : styles.inputError)}
              >
                <label htmlFor="shotTitle">TITLE</label>
                <input
                  id="shotTitle"
                  placeholder="What model is this mini?"
                  value={form.title.value}
                  className={formStyles.textInput}
                  onChange={this.handleInputChange("title")}
                  onBlur={() => this.handleBlur('title')}
                />
                {/** isTitleValid ? null :
                <p>* {form.title.errorMessage}</p>
                **/}
              </fieldset>

              <fieldset className={isGameValid ? null : styles.inputError}>
                <label htmlFor="shotGame">GAME</label>
                <Select
                  id="shotGame"
                  value={form.game.value}
                  options={
                    games.map(game =>
                      ({ value: game.id, label: game.name }))
                  }
                  onChange={(selected) => {
                    fieldChanged({
                      field: 'shots.newShot.form.game',
                      value: selected ? selected.value : null,
                    });
                  }}
                  onBlur={() => this.handleBlur('game')}
                />
                {/** isGameValid ? null :
                <p>* {form.game.errorMessage}</p>
                **/}
              </fieldset>

              <fieldset className={isArmyValid ? null : styles.inputError}>
                <label htmlFor="shotArmy">ARMY</label>
                <Select
                  id="shotArmy"
                  value={form.army.value}
                  options={
                    games
                      .filter((game) => {
                        return game.id === form.game.value;
                      })
                      .map((game) => {
                        return game.armies.map((army) => {
                          return {
                            value: army.id,
                            label: army.name,
                          };
                        });
                      })[0]
                  }
                  onChange={(selected) => {
                    fieldChanged({
                      field: 'shots.newShot.form.army',
                      value: selected ? selected.value : null,
                    });
                  }}
                  onBlur={() => this.handleBlur('army')}
                />
                {/** isArmyValid ? null :
                <p>* {form.army.errorMessage}</p>
                **/}
              </fieldset>

              <fieldset>
                <label htmlFor="shotDescription">DESCRIPTION (optional)</label>
                <textarea
                  id="shotDescription"
                  placeholder="We’d love to know…"
                  rows="6"
                  value={form.description.value}
                  className={formStyles.textInput}
                  onChange={this.handleInputChange("description")}
                />
              </fieldset>

              <fieldset className={styles.submitSet}>
                <button
                  disabled={!isValid}
                  className={cx(formStyles.button, formStyles.buttonRed, styles.button1)}
                  type="submit"
                >
                  Publish Photos
                </button>
                <button className={styles.button2}>
                  Cancel
                </button>
              </fieldset>
              <p className={styles.footer}>
                Clicking the button above indicates that you are agreeing
                our website’s
                <a href="/terms-of-use"> Terms of Use Policy</a>.
              </p>

            </form>
          </div>

        </div>
      </div>
    );
  }
});
