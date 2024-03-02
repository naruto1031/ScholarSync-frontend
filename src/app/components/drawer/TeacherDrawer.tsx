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
import { Dispatch, SetStateAction } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
	isOpen: boolean
	drawerWidth: number
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
interface DrawerMenuItems {
	text: string
	url?: string
}

export const TeacherDrawer = ({ isOpen, drawerWidth, setIsOpen }: Props) => {
	const pathName = usePathname()
	const lastPartOfUrl = pathName.split('/').pop()

	const drawerMenuItems: DrawerMenuItems[] = [
		{
			text: 'トップ',
			url: 'top',
		},
		{
			text: 'クラス',
		},
		{
			text: '課題提出状況',
			url: 'class_management',
		},
		{
			text: '課題免除許可',
			url: 'exemption_approval',
		},
		{
			text: '課題管理',
		},
		{
			text: '課題一覧',
			url: 'assignment_list',
		},
		{
			text: '課題登録',
			url: 'assignment_register',
		},
		{
			text: '課題表紙',
		},
		{
			text: '課題表紙承認',
			url: 'approve_assignment',
		},
		{
			text: '生徒通知(教室通知くん)',
		},
		{
			text: '通知登録',
			url: 'notification_register',
		},
		{
			text: '設定',
		},
		{
			text: 'アカウント設定',
			url: 'account_setting',
		},
	]

	const drawer = (
		<List>
			{drawerMenuItems.map((item, index) =>
				item.url ? (
					<ListItem key={index} disablePadding>
						<ListItemButton
							sx={{
								fontWeight: 'bold',
								backgroundColor: lastPartOfUrl === item.url ? '#0000001A' : 'transparent',
								padding: 0,
								'&:hover': {
									backgroundColor: '#0000001A',
								},
							}}
						>
							<Link
								href={`/teacher/portal/${item.url}`}
								style={{
									textDecoration: 'none',
									color: '#000000DE',
									display: 'block',
									width: '100%',
									padding: '10px 15px',
								}}
								prefetch={false}
							>
								<ListItemText
									primary={item.text}
									sx={{
										fontWeight: 'bold',
									}}
								/>
							</Link>
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
