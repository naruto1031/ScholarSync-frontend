import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Image from 'next/image'
import NextLink from 'next/link'

export const InfoHeader = () => {
	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: 'white',
			}}
		>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }} color={'black'}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							'@media (max-width: 800px)': {
								justifyContent: 'center',
							},
						}}
					>
						<Image src='/scholar_sync.jpg' width={300} height={47} alt='Picture of the author' />
					</Box>
				</Typography>
				<NextLink
					href={'./login'}
					passHref
					style={{
						textDecoration: 'none',
					}}
				>
					<Box
						sx={{
							textDecoration: 'none',
							color: '#085FCE',
							border: 'none',
						}}
					>
						Login
					</Box>
				</NextLink>
			</Toolbar>
		</AppBar>
	)
}
