import { useLocation, useRoutes } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import routes from './router';
import Progress from './compontents/nprogress';
import './App.less';
import useMediaQuery from '@/hooks/common/useMediaQuery';
import { useTheme } from './context/themeContext';
function App() {
    const { theme } = useTheme();

    const matchMedia = useMediaQuery(theme?.breakpoints?.down('lg'));

    useEffect(() => {
        console.log(matchMedia, 'matchMedia');
    }, [matchMedia]);

    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    return (
        <>
            <div className="App">
                <Progress isAnimating={isLoading} key={location.key} />
                <Suspense fallback="Loading....">
                    <div className="App">
                        <TransitionGroup>
                            <CSSTransition
                                classNames="fade"
                                key={location.key}
                                onEnter={() => {
                                    setIsLoading(true);
                                }}
                                onEntered={() => {
                                    setIsLoading(false);
                                }}
                                timeout={200}
                            >
                                {useRoutes(routes)}
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                </Suspense>
            </div>
        </>
    );
}

export default App;
