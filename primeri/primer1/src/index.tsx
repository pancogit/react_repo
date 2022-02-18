import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './ts/components/App';

// fontawesome icons
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);