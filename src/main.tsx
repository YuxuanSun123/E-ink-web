import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PostsPage from './PostsPage.tsx';
import EInkPage from './EInkPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/eink" element={<EInkPage />} />
      </Routes>
    </Router>
  </StrictMode>
);