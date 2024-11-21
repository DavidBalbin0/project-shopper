// @ts-ignore
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import RequestRideForm from "./components/RequestRideForm";

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RequestRideForm />
      </ThemeProvider>
  );
}

export default App;
