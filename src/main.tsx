import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MultiplayerProvider } from './contexts/MultiplayerContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultiplayerProvider>
      <App />
    </MultiplayerProvider>
  </StrictMode>,
);
