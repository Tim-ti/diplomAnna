import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c387e', // Dark blue color
    },
    secondary: {
      main: '#ff4444', // Red color for accents
    },
  },
});

const router = createBrowserRouter(
  [
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <div className="App">
            <Header />
            <Home />
          </div>
        </PrivateRoute>
      ),
    },
    {
      path: '/product/:id',
      element: (
        <PrivateRoute>
          <div className="App">
            <Header />
            <ProductPage />
          </div>
        </PrivateRoute>
      ),
    },
    {
      path: '/favorites',
      element: (
        <PrivateRoute>
          <div className="App">
            <Header />
            <FavoritesPage />
          </div>
        </PrivateRoute>
      ),
    },
    {
      path: '/',
      element: (
        <div className="App">
          <Login />
        </div>
      ),
    },
    {
      path: '/register',
      element: (
        <div className="App">
          <Register />
        </div>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 