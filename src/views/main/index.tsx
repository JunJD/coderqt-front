import { Button } from 'antd';
import { ReactNode, FC, Suspense } from 'react';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { MainWrapper } from './style';

type IProps = {
  children?: ReactNode;
};

const Main: FC<IProps> = () => {
  return (
    <MainWrapper>
      <Button>Main</Button>
      <Suspense fallback="Loading...">
        <Outlet></Outlet>
      </Suspense>
    </MainWrapper>
  );
};

export default memo(Main);
