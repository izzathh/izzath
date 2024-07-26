import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PortfolioProvider } from "../src/hooks/globeVars"
import { ParallaxProvider } from 'react-scroll-parallax';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </ParallaxProvider>
  </React.StrictMode>,
)
