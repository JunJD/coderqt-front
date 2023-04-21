// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';

export interface IMenuItem {
    // 唯一标识
    id: string;
    // 标题
    title: string;
    // 类型
    type: string;
    // 路由
    url?: string;
    // 图标
    icon?: any;
    // 是否显示在面包屑
    breadcrumbs?: boolean;
    // 子菜单
    children?: IMenuItem[];
    // 是否在新窗口打开
    target?: boolean;
    // 是否是外部链接
    external?: boolean;
}
export interface IMenuItems {
    items: IMenuItem[];
}
const menuItems: IMenuItems = {
    items: [dashboard, pages, utilities, support],
};

export default menuItems;
