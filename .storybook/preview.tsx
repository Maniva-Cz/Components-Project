import type { Preview } from "@storybook/react";
import React from 'react';

// IMPORTAÇÕES NECESSÁRIAS
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/store'; 

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <div style={{ margin: '3em' }}> 
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default preview;