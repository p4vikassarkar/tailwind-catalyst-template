'use client'

import { SidebarItem, SidebarLabel } from '@/components/sidebar'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <SidebarItem className={className} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? <MoonIcon data-slot="icon" /> : <SunIcon data-slot="icon" />}
      <SidebarLabel>{isDark ? 'Dark Mode' : 'Light Mode'}</SidebarLabel>
    </SidebarItem>
  )
}
