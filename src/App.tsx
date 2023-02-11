import React from 'react';
import {
  GlobalStyles,
  ThemeProvider,
} from '@mui/material';

import './i18n';
import theme from './Theme';
import Home from './routes/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { background: '#EEEEEE' } }} />
      <Home />
    </ThemeProvider>
  );
}

export default App;
