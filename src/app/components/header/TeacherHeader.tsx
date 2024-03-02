'use client'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { TeacherDrawer } from '../drawer/TeacherDrawer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'

interface Props {
	drawerWidth: number
}

export const TeacherHeader = ({ drawerWidth }: Props) => {
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
				<Link
					href={'/teacher/portal/account_setting'}
					style={{ textDecoration: 'none', color: 'white' }}
				>
					<AccountCircleIcon fontSize='large' />
				</Link>
			</Toolbar>
			<TeacherDrawer isOpen={isOpen} setIsOpen={setIsOpen} drawerWidth={drawerWidth} />
		</AppBar>
	)
}
