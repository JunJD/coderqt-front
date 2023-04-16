import { useNProgress } from '@tanem/react-nprogress';
import React from 'react';
import Bar from './../../component/bar';
import Container from './../../component/bar/container';

const Progress: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating,
    });

    return (
        <Container
            animationDuration={animationDuration}
            isFinished={isFinished}
        >
            <Bar animationDuration={animationDuration} progress={progress} />
        </Container>
    );
};

export default Progress;
