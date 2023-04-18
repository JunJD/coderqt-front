import { useLocation, useRoutes } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import {
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from 'react-transition-group';
import routes from './router';
import Progress from './compontents/nprogress';
import './App.less';
import useMediaQuery from '@/hooks/common/useMediaQuery';
import ScrollTop from '@/compontents/scrollTop';
function App() {
    const matchMedia = useMediaQuery('(min-width: 768px)');
    useEffect(() => {
        console.log(matchMedia, 'matchMedia');
    }, [matchMedia]);

    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    console.log(location, 'location');
    return (
        <>
            <Progress isAnimating={isLoading} key={location.key} />
            <div className="App">
                <Suspense fallback="Loading....">
                    <div className="App">
                        <TransitionGroup>
                            <SwitchTransition mode="out-in">
                                <CSSTransition
                                    classNames="fade"
                                    key={location.key}
                                    onExit={() => {
                                        setIsLoading(true);
                                    }}
                                    onExited={() => {
                                        setIsLoading(false);
                                    }}
                                    timeout={300}
                                >
                                    <ScrollTop>{useRoutes(routes)}</ScrollTop>
                                </CSSTransition>
                            </SwitchTransition>
                        </TransitionGroup>
                    </div>
                </Suspense>
            </div>
        </>
    );
}

export default App;
