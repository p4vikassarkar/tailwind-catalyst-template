'use client'

import React, { createContext, useContext, useState } from 'react'

type ModeContextType = {
  isSellerMode: boolean
  toggleMode: () => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [isSellerMode, setIsSellerMode] = useState(false)

  const toggleMode = () => setIsSellerMode((prev) => !prev)

  return (
    <ModeContext.Provider value={{ isSellerMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider')
  }
  return context
}
