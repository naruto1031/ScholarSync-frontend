'use client'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { StudentDrawer } from '../drawer/StudentDrawer'

interface Props {
	drawerWidth: number
}

export const Header = ({ drawerWidth }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<AppBar
			position='static'
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
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
					onClick={() => setIsOpen(true)}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					ScholarSync
				</Typography>
				<Button color='inherit' onClick={() => signOut()}>
					SignOut
				</Button>
			</Toolbar>
			<StudentDrawer isOpen={isOpen} setIsOpen={setIsOpen} drawerWidth={drawerWidth} />
		</AppBar>
	)
}
