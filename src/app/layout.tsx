import { NextAuthProvider } from '@/app/components'
import './globals.css'
import { LocalProvider } from './components/provider/LocalProvider'
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja'>
			<body
				style={{
					margin: 0,
				}}
			>
				<NextAuthProvider>
					<LocalProvider>{children}</LocalProvider>
				</NextAuthProvider>
			</body>
		</html>
	)
}
