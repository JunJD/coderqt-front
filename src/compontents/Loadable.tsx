import { FC, Suspense } from 'react';

// project import
import Loader from './Loader';

type LoadableType = (Component: any) => FC<any>;

// Loadable 是一个高阶组件，作用是当组件加载时，显示一个加载动画
// eslint-disable-next-line react/display-name
const Loadable: LoadableType = (Component) => (props) => {
    return (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;

/**
 * 例子：
 * import Loadable from './Loadable';
 *
 * const NavCard = Loadable(() => import('./NavCard'));
 *
 * <NavCard />
 *
 */
