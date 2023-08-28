import Image from 'next/image'
import ScholarSync from '../../public/scholar_sync.jpg'
import { Button, Container, Typography } from '@mui/material'
import style from './page.module.scss'
import NextLink from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Scholar Sync',
	description:
		'Scholar Sync: Azure ADと連携し、Microsoftアカウントを用いた学生情報の安全な管理を実現。信頼性とセキュリティを重視した学生情報管理Webアプリケーション。',
}

const Page = () => {
	return (
		<div className={style.container}>
			<Container maxWidth='sm'>
				<Image src={ScholarSync} alt='scholarSyncIcon' width={500} />
				<Typography variant='h4' component='h1' gutterBottom>
					Scholar Syncへようこそ
				</Typography>

				<NextLink className={style.to_link} href={'./student/dashboard/top'}>
					<Button variant='contained' color='primary'>
						はじめる
					</Button>
				</NextLink>
			</Container>
		</div>
	)
}

export default Page
