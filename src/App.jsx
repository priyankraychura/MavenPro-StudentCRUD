import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRoutes from './routes/MainRoutes'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121C2B',     // deep navy
      paper: '#1E2A3A',        // card background
    },
    primary: {
      main: '#80CBC4',         // teal
    },
    secondary: {
      main: '#CE93D8',         // soft purple
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    }
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <MainRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
