'use client'

import { Button } from '@mui/material'

const Main = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Button>main</Button>
			<div className='div'>{children}</div>
		</>
	)
}
export default Main
