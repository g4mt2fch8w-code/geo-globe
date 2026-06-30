import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Prevent desktop browser zoom via trackpad/mousewheel
document.addEventListener('wheel', (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
  }
}, { passive: false });

// Prevent desktop browser zoom via keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
    e.preventDefault();
  }
});

// Prevent mobile browser pinch-to-zoom (iOS Safari ignores user-scalable=no)
document.addEventListener('gesturestart', (e) => {
  e.preventDefault();
});

document.addEventListener('touchstart', (e) => {
  // Prevent multi-touch zoom on UI, but allow it on the Globe Canvas
  if (e.touches.length > 1 && (e.target as HTMLElement)?.tagName !== 'CANVAS') {
    e.preventDefault();
  }
}, { passive: false });

// Prevent double-tap to zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300 && (e.target as HTMLElement)?.tagName !== 'CANVAS') {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
