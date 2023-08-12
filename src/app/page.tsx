import Image from 'next/image'
import ScholarSync from '../../public/scholar_sync.jpg'
import { Button, Container, Typography } from '@mui/material'
import style from './page.module.scss'
import NextLink from 'next/link'

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
