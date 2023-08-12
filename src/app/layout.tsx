import NextAuthProvider from './components/provider/NextAuthProvider'
import './globals.css'
import Head from './components/head/Head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja'>
			<Head />
			<body>
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	)
}
