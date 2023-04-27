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
        casualChat: [],
        codeChat: [],
        editChat: [],
        hintChat: [],
        translateChat: [],
    },
    effects_UNSTABLE: [persistAtom],
});
