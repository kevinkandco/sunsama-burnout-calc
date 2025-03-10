
import { createRoot } from 'react-dom/client';
import BurnoutCalculator from '@/components/BurnoutCalculator';
import './index.css';

// Function to add base URL for all assets
export function setupEmbedEnvironment() {
  // Create a global variable to hold the base URL
  // @ts-ignore
  window.__BURNOUT_CALC_BASE_URL__ = (() => {
    // Try to get the base URL from the currently executing script
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes('burnout-calculator.umd.js')) {
        return src.substring(0, src.lastIndexOf('/') + 1);
      }
    }
    // Fallback to the known production URL if script detection fails
    return 'https://sunsama-burnout-calc.netlify.app/';
  })();
  
  console.log('Burnout Calculator embedding with base URL:', 
    // @ts-ignore
    window.__BURNOUT_CALC_BASE_URL__);
}

// Function to embed the calculator in any DOM element
export function embedBurnoutCalculator(targetElement: HTMLElement) {
  // Setup the environment first
  setupEmbedEnvironment();
  
  const root = createRoot(targetElement);
  root.render(<BurnoutCalculator />);
}

// Auto-initialize if there's a default container
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const defaultContainer = document.getElementById('burnout-calculator-container');
    if (defaultContainer) {
      embedBurnoutCalculator(defaultContainer);
    }
  });

  // Expose the embed function globally for manual initialization
  // @ts-ignore
  window.embedBurnoutCalculator = embedBurnoutCalculator;
}
