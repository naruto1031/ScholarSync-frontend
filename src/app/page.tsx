import { Box, Button, Container, Typography, Paper, Grid, Stack } from '@mui/material'
import NextLink from 'next/link'
import { Metadata } from 'next'
import { Footer, InfoHeader } from './components'
import Image from 'next/image'

const Page = () => {
	return (
		<Box
			sx={{
				overflowX: 'hidden',
			}}
		>
			<InfoHeader />
			<Box
				sx={{
					backgroundColor: '#E2F2FB',
					py: '30px',
				}}
			>
				<Box
					sx={{
						backgroundColor: '#fff',
						height: '350px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '10px',
						px: '20px',
						'@media (max-width: 800px)': {
							pt: '20px',
							flexDirection: 'column',
							height: 'auto',
						},
					}}
				>
					<Box
						sx={{
							'@media (max-width: 800px)': {
								textAlign: 'center',
							},
						}}
					>
						<Box>学生情報管理アプリ ScholarSync</Box>
						<Box
							sx={{
								fontSize: '45px',
								my: '15px',
							}}
						>
							面倒な
							<span
								style={{
									color: '#085FCE',
								}}
							>
								申請手続き
							</span>
							をより
							<span
								style={{
									color: '#085FCE',
								}}
							>
								効率的
							</span>
							に
						</Box>
						<Box>安全に簡単に学生情報を管理できます！！</Box>
						<NextLink href={'./login'} passHref>
							<Button
								variant='contained'
								color='primary'
								sx={{ borderRadius: '10px', padding: '10px 20px', mt: '20px', fontWeight: 'bold' }}
							>
								今すぐはじめる
							</Button>
						</NextLink>
					</Box>
					<Box>
						<Image src='/student.jpg' width={500} height={293} alt='Picture of the author' />
					</Box>
				</Box>
				<Container maxWidth='lg'>
					<Box
						sx={{
							width: '100%',
							margin: '0 auto',
						}}
					>
						<Box
							sx={{
								textAlign: 'center',
								fontSize: '30px',
								my: '30px',
								fontWeight: 'bold',
							}}
						>
							ScholarSyncとは
						</Box>
						<Box
							sx={{
								fontSize: '20px',
								textAlign: 'center',
								my: '20px',
							}}
						>
							学生、教員間の手続きを効率化するための学生情報管理アプリケーションです。
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								gap: '100px',
								my: '40px',
								'@media (max-width: 800px)': {
									flexDirection: 'column',
									gap: '20px',
									justifyContent: 'center',
								},
							}}
						>
							<Box
								sx={{
									width: '300px',
									'@media (max-width: 800px)': {
										margin: '0 auto',
									},
								}}
							>
								<Box
									sx={{
										width: 'fit-content',
										margin: '0 auto',
									}}
								>
									<Image
										src='/rejoice_man_mono.png'
										width={200}
										height={200}
										alt='Picture of the author'
									/>
								</Box>
								<Box
									sx={{
										backgroundColor: '#fff',
										padding: '30px 20px',
										borderRadius: '10px',
										mt: '20px',
										height: '80px',
										position: 'relative',
									}}
								>
									<Box
										sx={{
											position: 'absolute',
											top: '-14px',
											left: '50%',
											transform: 'translateX(-50%)',
											fontSize: '20px',
											backgroundColor: '#E2F2FB',
											borderRadius: '10px',
											px: '20px',
											pb: '5px',
										}}
									>
										学生
									</Box>
									面倒な申請手続きを
									<span
										style={{
											color: '#085FCE',
										}}
									>
										ボタン一つ
									</span>
									で完了することができ、申請状況を
									<span
										style={{
											color: '#085FCE',
										}}
									>
										簡単に確認
									</span>
									することができます。
								</Box>
							</Box>
							<Box
								sx={{
									width: '300px',
									'@media (max-width: 800px)': {
										margin: '0 auto',
									},
								}}
							>
								<Box
									sx={{
										width: 'fit-content',
										margin: '0 auto',
									}}
								>
									<Image
										src='/engineer_suit_mono.png'
										width={200}
										height={200}
										alt='Picture of the author'
									/>
								</Box>
								<Box
									sx={{
										position: 'relative',
										backgroundColor: '#fff',
										padding: '30px 20px',
										borderRadius: '10px',
										mt: '20px',
										height: '80px',
									}}
								>
									<Box
										sx={{
											position: 'absolute',
											top: '-14px',
											left: '50%',
											transform: 'translateX(-50%)',
											fontSize: '20px',
											backgroundColor: '#E2F2FB',
											borderRadius: '10px',
											px: '20px',
											pb: '5px',
										}}
									>
										教員
									</Box>
									課題表紙の
									<span
										style={{
											color: '#085FCE',
										}}
									>
										一括承認・差戻し
									</span>
									、生徒の課題提出状況の一括確認など、
									<span
										style={{
											color: '#085FCE',
										}}
									>
										業務を効率化
									</span>
									する機能を提供しています。
								</Box>
							</Box>
						</Box>
					</Box>
				</Container>
			</Box>
			<Footer />
		</Box>
	)
}

export default Page
