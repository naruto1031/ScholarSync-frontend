import { NextAuthProvider} from '@/app/components'
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
