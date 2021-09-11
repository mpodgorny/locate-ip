//TODO: cleanup imports
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme, Box } from '@material-ui/core';
import Layout from 'containers/Layout';

const darkTheme: Theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#222222',
    },
  },
});

const App: React.FC = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider
        preventDuplicate
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <CssBaseline />
        <Box m={{ xs: 1, md: 3 }}>
          <Layout />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
