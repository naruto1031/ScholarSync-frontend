import Head from 'next/head'

const HeadScholarSync = () => {
	return (
		<>
			<Head>
				<title>ScholarSync</title>
				<meta http-equiv="Content-Security-Policy" content="script-src 'none'"></meta>
				<meta name='top' content='ScholarSyncです' />
				<meta name="description" content="Scholar Sync: Azure ADと連携し、Microsoftアカウントを用いた学生情報の安全な管理を実現。信頼性とセキュリティを重視した学生情報管理Webアプリケーション。" />
			</Head>
		</>
	)
}

export default HeadScholarSync
