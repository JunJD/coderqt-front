import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollTopProps {
    children?: React.ReactNode;
}

// 用于监听路由变化，当路由变化时，滚动条回到顶部
const ScrollTop: FC<ScrollTopProps> = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return children as JSX.Element;
};

export default ScrollTop;
