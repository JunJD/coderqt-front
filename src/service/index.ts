import { BASE_URL, TIME_OUT } from './config';
import ZMRequest from './request';

const zmRequest = new ZMRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {},
});

const chatGPTRequest = new ZMRequest(
    {
        baseURL: 'https://api.openai.com',
        timeout: TIME_OUT,
        interceptors: {},
        headers: {
            Authorization: 'Bearer ' + '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',
        },
    }, {
    model: 'gpt-3.5-turbo',
}, true,);

export {
    zmRequest,
    chatGPTRequest,
};


