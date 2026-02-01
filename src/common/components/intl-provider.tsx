'use client'

import { IntlProvider } from 'react-intl'
import { ReactNode } from 'react'
import enMessages from '@/locales/en.json'

type SupportedLocale = 'en'

const messages: Record<SupportedLocale, Record<string, string>> = {
  en: enMessages,
}

interface IntlProviderWrapperProps {
  children: ReactNode
  locale?: SupportedLocale
}

export function IntlProviderWrapper({ children, locale = 'en' }: IntlProviderWrapperProps) {
  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      {children}
    </IntlProvider>
  )
}
