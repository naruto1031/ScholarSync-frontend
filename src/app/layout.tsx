import './globals.css'
import { LocalProvider } from './components/provider/LocalProvider'
import { M_PLUS_1_Code } from 'next/font/google'
import { ReactNode } from 'react'

const mPlus1p = M_PLUS_1_Code({ weight: '400', subsets: ['latin'] })
export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='ja'>
			<body
				style={{
					margin: 0,
				}}
				className={mPlus1p.className}
			>
				<LocalProvider>{children}</LocalProvider>
			</body>
		</html>
	)
}
