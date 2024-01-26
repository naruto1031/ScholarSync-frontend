import {
	Drawer,
	Box,
	Typography,
	List,
	ListItemButton,
	ListItem,
	ListItemText,
	Divider,
} from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
	isOpen: boolean
	drawerWidth: number
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
interface DrawerMenuItems {
	text: string
	url?: string
}

export const StudentDrawer = ({ isOpen, drawerWidth, setIsOpen }: Props) => {
	const router = useRouter()
	const pathName = usePathname()
	const lastPartOfUrl = pathName.split('/').pop()

	const drawerMenuItems: DrawerMenuItems[] = [
		{
			text: '学生トップ',
			url: 'top',
		},
		{
			text: '教科',
		},
		{
			text: '教科一覧',
			url: 'subject_list',
		},
		{
			text: '課題',
		},
		{
			text: '課題表紙提出',
			url: 'submit_assignment',
		},
		{
			text: '提出状況',
			url: 'submission_status',
		},
	]

	const handleMenuClick = (url: string, urlPrefix: string | undefined) => {
		setIsOpen(false)
		router.push(url)
	}

	const drawer = (
		<List>
			{drawerMenuItems.map((item, index) =>
				item.url ? (
					<ListItem key={index} disablePadding>
						<ListItemButton
							sx={{
								fontWeight: 'bold',
								backgroundColor: lastPartOfUrl === item.url ? '#0000001A' : 'transparent',
								'&:hover': {
									backgroundColor: '#0000001A',
								},
							}}
							onClick={() => handleMenuClick(`/student/dashboard/${item.url}`, item.url)}
						>
							<ListItemText
								primary={item.text}
								sx={{
									fontWeight: 'bold',
								}}
							/>
						</ListItemButton>
					</ListItem>
				) : (
					<Box key={index}>
						<Divider />
						<ListItem key={index}>
							<ListItemText
								sx={{
									color: '#0000008A',
									fontWeight: 'bold',
									height: '10px',
								}}
								secondary={item.text}
							/>
						</ListItem>
					</Box>
				),
			)}
		</List>
	)

	return (
		<Box
			component={'nav'}
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			aria-label='mailbox folders'
		>
			<Drawer
				open={isOpen}
				onClose={() => setIsOpen(false)}
				variant='temporary'
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 0.5,
						ml: 'auto',
						mt: 1,
						mr: 2,
					}}
				>
					<Typography
						component='label'
						htmlFor='close-icon'
						fontSize='sm'
						fontWeight='lg'
						sx={{ cursor: 'pointer' }}
						onClick={() => setIsOpen(false)}
					>
						Close
					</Typography>
				</Box>
				{drawer}
			</Drawer>
			<Drawer
				variant='permanent'
				// loadingの時にdrawerのzIndexが1000になるので、その時はdrawerを隠す
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					zIndex: { xs: 0, sm: 1000 },
				}}
				open
			>
				<Divider
					sx={{
						mt: 8,
					}}
				/>
				{drawer}
			</Drawer>
		</Box>
	)
}
