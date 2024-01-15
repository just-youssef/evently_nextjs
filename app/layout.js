import '@styles/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Navbar } from '@components';
import StoreProvider from '@lib/StoreProvider';
import MUIThemeProvider from '@components/MUIThemeProvider';

export const metadata = {
  title: 'Evently',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="" suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <MUIThemeProvider>
              <Navbar />
              {children}
            </MUIThemeProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
