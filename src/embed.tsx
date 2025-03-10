import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BurnoutCalculator from '@/components/BurnoutCalculator';
import './index.css';

const queryClient = new QueryClient();

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

// Function to embed the calculator
function embedBurnoutCalculator(targetElement: HTMLElement) {
  try {
    setupEmbedEnvironment();
    const root = createRoot(targetElement);
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <BurnoutCalculator />
          </TooltipProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize Burnout Calculator:', error);
  }
}

// Make it available globally
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.embedBurnoutCalculator = embedBurnoutCalculator;
  
  // Auto-initialize if default container exists
  window.addEventListener('DOMContentLoaded', () => {
    const defaultContainer = document.getElementById('burnout-calculator-container');
    if (defaultContainer) {
      embedBurnoutCalculator(defaultContainer);
    }
  });
}

export { embedBurnoutCalculator };
