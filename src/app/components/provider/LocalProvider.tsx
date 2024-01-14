'use client'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const LocalProvider = ({ children }: { children: React.ReactNode }) => {
	return <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
}
