let BASE_URL = '';
const TIME_OUT = 10000;

if (import.meta.env.PROD) {
    // 生产环境
    BASE_URL = 'api';
} else {
    // 开发环境
    BASE_URL = 'http://127.0.0.1:3000';
}

export { BASE_URL, TIME_OUT };
//
