import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist-GptStore', // 此键用于在本地存储中存储数据
    storage: sessionStorage, // 配置将用于存储数据的存储
});

export interface messageItem {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

type GptStore = {
    [key in
        | 'casualChat'
        | 'codeChat'
        | 'editChat'
        | 'hintChat'
        | 'translateChat']: messageItem[];
};

export const gptStore = atom<GptStore>({
    key: 'gptStore',
    default: {
        casualChat: [
            {
                role: 'assistant',
                content: '你好，我是休闲聊天小助手，有什么可以帮到你的吗？',
            },
        ],
        codeChat: [
            {
                role: 'assistant',
                content: '你好，我是代码助手，有什么可以帮到你的吗？',
            },
        ],
        editChat: [
            {
                role: 'assistant',
                content: '你好，我是编辑助手，有什么可以帮到你的吗？',
            },
        ],
        hintChat: [
            {
                role: 'assistant',
                content: '你好，我是提示助手，有什么可以帮到你的吗？',
            },
        ],
        translateChat: [
            {
                role: 'system',
                content: '你现在是翻译模式',
            },
            {
                role: 'assistant',
                content: '请选择目标翻译语言',
            },
        ],
    },
    effects_UNSTABLE: [persistAtom],
});
