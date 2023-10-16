import NextAuthProvider from './components/provider/NextAuthProvider'
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja'>
			<body>
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	)
}
