import { useRoutes } from 'react-router-dom';
import routes from '@/router';
import './App.less';
import ScrollTop from '@/compontents/scrollTop';
import ThemeCustomization from '@/themes';
function App() {
    return (
        <>
            <div className="App">
                <ThemeCustomization>
                    <ScrollTop>{useRoutes(routes)}</ScrollTop>
                </ThemeCustomization>
            </div>
        </>
    );
}

export default App;
