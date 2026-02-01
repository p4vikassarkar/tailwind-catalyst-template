'use client'

import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'
import { IntlProviderWrapper } from '@/components/intl-provider'
import { store } from '@/store/index'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <IntlProviderWrapper>
          {children}
        </IntlProviderWrapper>
      </ThemeProvider>
    </ReduxProvider>
  )
}
