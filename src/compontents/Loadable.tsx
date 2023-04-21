import { Suspense } from 'react';

// project import
import Loader from './Loader';

// Loadable是一个HO组件，用于懒加载
// eslint-disable-next-line react/display-name
const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
