import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/fixLeafletIcon.ts';
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </Router>,
)
