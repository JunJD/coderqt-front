import { atom } from 'recoil';
export const menuStore = atom({
    key: 'menuStore',
    default: {
        drawerOpen: false,
        openItem: [] as string[],
    },
});
