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

import scholarSyncIcon from '../../../../public/scholar_sync.jpg'

import NextLink from 'next/link'
import Image from 'next/image'

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
			<Toolbar>
				<Image src={scholarSyncIcon} alt='scholarSyncIcon' width={200} />
			</Toolbar>
			<Divider />
			<List>
				{menu.map((item, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton>
							<NextLink
								href={`/student/dashboard/${item.url}`}
								className={style.link}
							>
								<ListItemText primary={item.text} />
							</NextLink>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Drawer>
	)
}

export default SideMenu
