import { atom } from 'recoil';
import { message } from 'antd';
export const authStore = atom({
    key: 'mainStore',
    default: {
        token: '',
        userInfo: {},
    },
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue /*, oldValue, isReset*/) => {
                localStorage.setItem('token', newValue.token);
                message.success('登录成功');
            });
        },
    ],
});
