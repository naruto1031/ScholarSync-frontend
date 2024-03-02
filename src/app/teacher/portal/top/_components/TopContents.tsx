import Box from '@mui/material/Box'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import { CardContents } from './CardContents'

const assignmentCardContents = [
	{
		title: '課題一覧',
		icon: FormatListNumberedIcon,
		url: 'assignment_list',
	},
	{
		title: '課題登録',
		icon: SaveAltIcon,
		url: 'assignment_register',
	},
	{
		title: '課題表紙承認',
		icon: BeenhereIcon,
		url: 'approve_assignment',
	},
]

const notifyCardContents = [
	{
		title: '通知登録',
		icon: NotificationsActiveIcon,
		url: 'notification_register',
	},
]

const classCardContents = [
	{
		title: '課題提出状況',
		icon: ManageHistoryIcon,
		url: 'class_management',
	},
	{
		title: '課題免除許可',
		icon: BeenhereIcon,
		url: 'exemption_approval',
	},
]

export const TopContents = () => {
	return (
		<Box>
			<Box
				sx={{
					fontSize: '20px',
					py: '10px',
				}}
			>
				課題表紙作業
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '10px',
				}}
			>
				{assignmentCardContents.map((content, index) => (
					<CardContents key={index} {...content} />
				))}
			</Box>
			<Box
				sx={{
					fontSize: '20px',
					py: '10px',
				}}
			>
				通知登録
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '10px',
				}}
			>
				{notifyCardContents.map((content, index) => (
					<CardContents key={index} {...content} />
				))}
			</Box>
			<Box
				sx={{
					fontSize: '20px',
					py: '10px',
				}}
			>
				提出状況
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '10px',
				}}
			>
				{classCardContents.map((content, index) => (
					<CardContents key={index} {...content} />
				))}
			</Box>
		</Box>
	)
}
