import { NextAuthProvider } from '@/app/components'
import './globals.css'
import { LocalProvider } from './components/provider/LocalProvider'
import { M_PLUS_1_Code } from 'next/font/google'
import { Metadata } from 'next'

const mPlus1p = M_PLUS_1_Code({ weight: '400', subsets: ['latin'] })
const APP_NAME = 'Scholar Sync'
const APP_DEFAULT_TITLE = 'Scholar Sync'
const APP_TITLE_TEMPLATE = '%s | Scholar Sync'
const APP_DESCRIPTION =
	'Scholar Sync: Azure ADと連携し、Microsoftアカウントを用いた学生情報の安全な管理を実現。信頼性とセキュリティを重視した学生情報管理Webアプリケーション。'
export const metadata: Metadata = {
	title: 'Scholar Sync',
	description: APP_DESCRIPTION,
	manifest: '/manifest.json',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: 'website',
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
