import React from 'react';
import { createTheme, MantineProvider } from '@mantine/core';

import { UIHome } from "pages";

import '@mantine/core/styles.css';
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...


const theme = createTheme({
  /** Put your mantine theme override here */
});

export function Application() {
  return (
    <MantineProvider theme={theme}>
      <UIHome/>
    </MantineProvider>
  )
}