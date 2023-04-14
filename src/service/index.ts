import { BASE_URL, TIME_OUT } from './config';
import ZMRequest from './request';

const zmRequest = new ZMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {},
});

export default zmRequest;
