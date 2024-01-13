import {
	Drawer,
	Box,
	Typography,
	List,
	ListItemButton,
	ListItem,
	ListItemText,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
interface DrawerMenuItems {
	text: string
	url: string
}

export const TeacherDrawer = ({ isOpen, setIsOpen }: Props) => {
	const router = useRouter()
	const drawerMenuItems: DrawerMenuItems[] = [
		{
			text: '教師トップ',
			url: 'top',
		},
		{
			text: '担任クラスの管理',
			url: 'class_management',
		},
		{
			text: '課題表紙承認',
			url: 'approve_assignment',
		},
	]

	const handleMenuClick = (url: string) => {
		setIsOpen(false)
		router.push(url)
	}
	return (
		<Drawer
			open={isOpen}
			onClose={() => setIsOpen(false)}
			sx={{
				width: '250px',
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: '250px',
					boxSizing: 'border-box',
				},
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
			<List>
				{drawerMenuItems.map((item, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton
							onClick={() => handleMenuClick(`/entrance/teacher/dashboard/${item.url}`)}
						>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	)
}
