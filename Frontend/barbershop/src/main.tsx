import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'antd/dist/reset.css';
import MainLayout from './components/Layout/Layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainLayout>
    <App />
    </MainLayout>
  </StrictMode>,
)