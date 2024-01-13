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

export const StudentDrawer = ({ isOpen, setIsOpen }: Props) => {
	const router = useRouter()
	const drawerMenuItems: DrawerMenuItems[] = [
		{
			text: '学生トップ',
			url: 'top',
		},
		{
			text: '教科一覧',
			url: 'subject_list',
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
							onClick={() => handleMenuClick(`/entrance/student/dashboard/${item.url}`)}
						>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	)
}
