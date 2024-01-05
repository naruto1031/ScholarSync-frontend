import Image from 'next/image'
import ScholarSync from '../../public/Scholar sync.svg'
import { Box, Button, Container, Typography, Paper, Grid } from '@mui/material'
import NextLink from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Scholar Sync',
	description:
		'Scholar Sync: Azure ADと連携し、Microsoftアカウントを用いた学生情報の安全な管理を実現。信頼性とセキュリティを重視した学生情報管理Webアプリケーション。',
}

const Page = () => {
	return (
		<Box sx={{ backgroundColor: '#f4f4f4', padding: '40px', height: '100vh' }}>
			<Container maxWidth='lg'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Paper elevation={3} sx={{ padding: '30px', textAlign: 'center', marginTop: '20px' }}>
							<Typography variant='h4' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
								Scholar Syncへようこそ
							</Typography>
							<Typography variant='body1' sx={{ marginBottom: '20px' }}>
								教育の未来を、テクノロジーと共に。Scholar
								Syncは、教育機関が直面する現代の課題に対応するために設計された、革新的な管理ツールです。Microsoftアカウントとの連携により、安全かつ効率的な学生情報管理を可能にします。信頼性の高いセキュリティ機能で、学生情報を守ります。
							</Typography>
							<NextLink href={'./entrance/student/dashboard/top'} passHref>
								<Button
									variant='contained'
									color='primary'
									sx={{ borderRadius: '20px', padding: '10px 20px' }}
								>
									はじめる
								</Button>
							</NextLink>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default Page
