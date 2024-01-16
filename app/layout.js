import '@styles/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { DateProvider, MUIThemeProvider, Navbar, StoreProvider } from '@components';

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
              <DateProvider>
                <Navbar />
                {children}
              </DateProvider>
            </MUIThemeProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
