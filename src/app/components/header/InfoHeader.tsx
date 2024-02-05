import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Box from '@mui/material/Box'
import Image from 'next/image'

export const InfoHeader = () => {
	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: 'white',
			}}
		>
			<Toolbar>
				<IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{
						mr: 2,
						display: { sm: 'none' },
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }} color={'black'}>
					<Box>
						<Image
							src='\public\Scholar sync.svg'
							width={500}
							height={500}
							alt='Picture of the author'
						/>
					</Box>
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
