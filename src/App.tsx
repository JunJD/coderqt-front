import { useLocation, useRoutes } from 'react-router-dom';
import { Suspense, useState } from 'react';
import {
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from 'react-transition-group';
import routes from '@/router';
import Progress from '@/compontents/nprogress';
import './App.less';
import ScrollTop from '@/compontents/scrollTop';
import ThemeCustomization from '@/themes';
function App() {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    return (
        <>
            <Progress isAnimating={isLoading} key={location.key} />
            <div className="App">
                <Suspense fallback="Loading....">
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
                                <ThemeCustomization>
                                    <ScrollTop>{useRoutes(routes)}</ScrollTop>
                                </ThemeCustomization>
                            </CSSTransition>
                        </SwitchTransition>
                    </TransitionGroup>
                </Suspense>
            </div>
        </>
    );
}

export default App;
