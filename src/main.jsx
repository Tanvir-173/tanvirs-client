import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from "react-router";
import { router } from './Routes/Router.jsx';
 // fixed typo
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from "../src/Context/AuthContext/AtuhProvider.jsx"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
        <RouterProvider router={router} />
       </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
