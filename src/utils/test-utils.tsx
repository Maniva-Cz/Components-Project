import React from 'react';
import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';

// Essa função envolve qualquer componente com o Provider do Redux e o Router
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-exportamos tudo do testing-library
export * from '@testing-library/react';

// Exportamos nosso render customizado
export { customRender as render };