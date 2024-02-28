'use client'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactNode } from 'react'

export const LocalProvider = ({ children }: { children: ReactNode }) => {
	return <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
}
