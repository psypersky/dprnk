// const Form = require('cerebral-module-forms/Form')

module.exports = {

  // === Page ===
  currentPage: 'home',
  currentQuery: '',

  // // === Page ===
  // currentPage: 'gallery',
  // currentQuery: '',
  //
  // // === Modal ===
  // modal: {
  //   show: false,
  //   page: '',
  //   backgroundPage: '',
  // },
  //
  // // === User profile ===
  // user: null,
  //
  // // === Message at the top of the page ===
  // topNotice: null,
  //
  // // === Authentication ===
  // auth: {
  //   signup: {
  //
  //     // Temporal userdata storage
  //     user: {},
  //     twitterToken: '',
  //
  //     // Registration Form
  //     formErrors: {},
  //     form: new Form({
  //       email: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['isEmail', 'minLength:6'],
  //         errorMessages: ['* Not a valid email address!', 'Too short email'],
  //       },
  //       password: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['minLength:6'],
  //         errorMessages: ['Password to short, min 6 characters'],
  //       },
  //       passwordConfirm: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['minLength:6'],
  //         errorMessages: ['Password to short, min 6 characters'],
  //       },
  //     }),
  //
  //     // ???
  //     confirmForm: new Form({
  //       password: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['minLength:6'],
  //         errorMessages: ['Password too short'],
  //       },
  //     }),
  //
  //     // Setup Account Form
  //     setupAccountFormErrors: [],
  //     setupAccountForm: new Form({
  //       username: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['minLength:6'],
  //         errorMessages: ['*Username is too short'],
  //       },
  //       location: {
  //         value: '',
  //       },
  //       bio: {
  //         value: '',
  //       },
  //       websiteUrl: {
  //         value: '',
  //       },
  //       facebookUrl: {
  //         value: '',
  //       },
  //       twitterUrl: {
  //         value: '',
  //       },
  //       availableForPainting: {
  //         value: true,
  //       },
  //       showEmail: {
  //         value: true,
  //       },
  //     }),
  //   },
  //
  //   login: {
  //     formErrors: {},
  //     form: new Form({
  //       email: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['isEmail', 'minLength:6'],
  //         errorMessages: ['Not valid email', 'Too short email'],
  //       },
  //       password: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['minLength:6'],
  //         errorMessages: ['Password too short'],
  //       },
  //     }),
  //   },
  //
  //   resetPassword: {
  //     form: new Form({
  //       email: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['isEmail', 'minLength:6'],
  //         errorMessages: ['We couldn’t find an account under that email.', 'Too short email'],
  //       },
  //     }),
  //
  //     resetData: {
  //       email: '',
  //       token: '',
  //     },
  //   },
  //
  //   setNewPassword: {
  //     form: new Form({
  //       password: {
  //         value: '',
  //         isRequired: true,
  //         validations: ['minLength:6'],
  //       },
  //     }),
  //   },
  // },
  //
  // // === Upload image Component ===
  // uploadImageComponent: {
  //   uploading: false,
  //   hasError: false,
  //   errors: {},
  // },
  //
  // // === Account Page ===
  // account: {
  //
  //   settingsFormErrors: {},
  //   settingsForm: new Form({
  //     username: {
  //       value: '',
  //       isRequired: true,
  //       validations: ['minLength:6'],
  //       errorMessages: ['Username is too short'],
  //     },
  //     location: {
  //       value: '',
  //     },
  //     bio: {
  //       value: '',
  //     },
  //     websiteUrl: {
  //       value: '',
  //     },
  //     facebookUrl: {
  //       value: '',
  //     },
  //     twitterUrl: {
  //       value: '',
  //     },
  //     availableForPainting: {
  //       value: true,
  //     },
  //     showEmail: {
  //       value: true,
  //     },
  //   }),
  //
  //   passwordFormErrors: {},
  //   passwordForm: new Form({
  //     oldPassword: {
  //       value: '',
  //       isRequired: true,
  //       validations: ['minLength:6'],
  //       errorMessages: ['Password too short'],
  //     },
  //     newPassword: {
  //       value: '',
  //       isRequired: true,
  //       validations: ['minLength:6'],
  //       errorMessages: ['Password too short'],
  //     },
  //   }),
  // },
  //
  // // === Shots ===
  // shots: {
  //   newShot: {
  //     form: new Form({
  //       shotImg: {
  //         value: null,
  //       },
  //       shotImgUploading: {
  //         value: false,
  //       },
  //       attachmentsImgs: {
  //         value: [],
  //       },
  //       attachmentsImgsUploading: {
  //         value: false,
  //       },
  //       title: {
  //         value: '',
  //         isRequired: true,
  //       },
  //       game: {
  //         value: '',
  //         isRequired: true,
  //       },
  //       army: {
  //         value: '',
  //         isRequired: true,
  //       },
  //       description: {
  //         value: '',
  //       },
  //     }),
  //   },
  // },
  //
  // // === Gallery ===
  // gallery: {
  //   loading: false,
  //   loadingMore: false,
  //   textSearchMode: false,
  //   shots: {},
  //   shotsOrder: [],
  //   searchBar: {
  //     value: '',
  //     isTouched: false,
  //     mode: 'input', // input | token
  //   },
  //   filters: new Form({
  //     gameId: {
  //       value: undefined,
  //     },
  //     armyId: {
  //       value: undefined,
  //     },
  //     time: {
  //       value: "0",
  //     },
  //     sort: {
  //       value: 'most_likes',
  //     },
  //   }),
  // },
  //
  // // === Shot Page ===
  // shotPage: {
  //   shots: {},
  // },
  //
  //
  // // === Config ===
  // config: {
  //   games: [],
  // },
};
