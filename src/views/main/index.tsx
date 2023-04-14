import { Button } from 'antd';
import { ReactNode, FC, Suspense } from 'react';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MainWrapper } from './style';
type IProps = {
    children?: ReactNode;
};

const Main: FC<IProps> = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('navigate');
        navigate('/main/contexify');
    };

    return (
        <MainWrapper>
            <Button onClick={handleClick}>Main</Button>
            <Suspense fallback="Loading...">
                <Outlet></Outlet>
            </Suspense>
        </MainWrapper>
    );
};

export default memo(Main);
