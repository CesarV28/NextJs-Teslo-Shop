
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '@/themes';


import '@/styles/globals.css'
import { UIProvider } from '@/context';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';





export default function App({ Component, pageProps }: AppProps) {
  return (

    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <UIProvider>
        <ThemeProvider theme={ lightTheme}>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
    
  )
}
