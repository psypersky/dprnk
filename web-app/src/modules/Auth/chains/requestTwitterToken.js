import { sendTwitterTokenRequest, setTwitterToken } from '../actions';

export default [
  sendTwitterTokenRequest,
  {
    success: [
      setTwitterToken,
    ],
    error: [
      // Do nothing
    ],
  },
];
