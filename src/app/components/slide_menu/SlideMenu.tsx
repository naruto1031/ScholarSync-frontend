'use client'
import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from '@mui/material'

import NextLink from 'next/link'

interface Menu {
	text: string
	url: string
}

const menu: Menu[] = [
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

import style from './SlideMenu.module.scss'

const SideMenu = () => {

	return (
		<Drawer
			sx={{
				width: '250px',
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: '250px',
					boxSizing: 'border-box',
				},
			}}
			variant='permanent'
			anchor='left'
		>
			<Toolbar />
			<Divider />
			<List>
				{menu.map((item, index) => (
					<NextLink
						href={`/student/dashboard/${item.url}`}
						key={index}
						className={style.link}
					>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					</NextLink>
				))}
			</List>
			<Divider />
		</Drawer>
	)
}

export default SideMenu
