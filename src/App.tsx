import { useLocation, useRoutes } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import routes from './router';
import Progress from './compontents/nprogress';
import './App.less';
function App() {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    return (
        <>
            <div className="App">
                <Suspense fallback="Loading....">
                    <Progress isAnimating={isLoading} key={location.key} />
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
