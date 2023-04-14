import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './router';

function App() {
  return (
    <div className="App">
      <Suspense fallback="Loading....">
        <div className="App">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
