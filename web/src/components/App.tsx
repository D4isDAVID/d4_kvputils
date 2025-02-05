import { useEffect } from 'react';
import { VisibilityProvider } from '../providers/VisibilityProvider.tsx';
import { demo } from '../utils/demo.ts';

function App() {
    useEffect(demo, []);

    return (
        <VisibilityProvider>
            <h1>Hello, world!</h1>
        </VisibilityProvider>
    );
}

export default App;
