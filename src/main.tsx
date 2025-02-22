import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VibeWriter from './VibeWriter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VibeWriter />
  </StrictMode>,
)
