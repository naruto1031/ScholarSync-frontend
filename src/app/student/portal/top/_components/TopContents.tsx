'use client'
import Box from '@mui/material/Box'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import PublishIcon from '@mui/icons-material/Publish'
import { CardContents } from './CardContents'
import { IssueCoverStatusCount } from '@/types/api-response-types'
import SummarizeIcon from '@mui/icons-material/Summarize'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import ErrorIcon from '@mui/icons-material/Error'
import PendingIcon from '@mui/icons-material/Pending'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Paper, useTheme } from '@mui/material'

const assignmentCardContents = [
	{
		title: '課題表紙提出',
		icon: PublishIcon,
		url: 'submit_assignment',
	},
	{
		title: '提出状況',
		icon: ManageHistoryIcon,
		url: 'submission_status',
	},
]
interface Props {
	count: IssueCoverStatusCount
}

export const TopContents = ({ count }: Props) => {
	const notSubmittedCount =
		count.issue_cover_status_count.total -
		Object.entries(count.issue_cover_status_count).reduce(
			(acc, [key, value]) => (key === 'total' ? acc : acc + value),
			0,
		)

	const approvedCount = count.issue_cover_status_count.approved ?? 0
	const exemptionCount = count.issue_cover_status_count.exemption ?? 0
	const resubmissionCount = count.issue_cover_status_count.resubmission ?? 0
	const pendingCount = count.issue_cover_status_count.pending ?? 0
	const latePendingCount = count.issue_cover_status_count.late_pending ?? 0
	const pendingExemptionCount = count.issue_cover_status_count.pending_exemption ?? 0
	const pendingExemptionApprovalCount =
		count.issue_cover_status_count.pending_exemption_approval ?? 0

	const theme = useTheme()
	return (
		<Box>
			<Box
				sx={{
					fontSize: '20px',
					py: '10px',
					[theme.breakpoints.down('sm')]: {
						textAlign: 'center',
					},
				}}
			>
				課題表紙作業
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '10px',
					[theme.breakpoints.down('sm')]: {
						justifyContent: 'center',
					},
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
					[theme.breakpoints.down('sm')]: {
						textAlign: 'center',
					},
				}}
			>
				提出状況
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '10px',
					[theme.breakpoints.down('sm')]: {
						justifyContent: 'center',
					},
				}}
			>
				<Paper
					sx={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<SummarizeIcon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>
						課題承認率:{' '}
						{Math.floor(
							(approvedCount / (count.issue_cover_status_count.total - exemptionCount)) * 100,
						)}
						%
					</Box>
				</Paper>
				<Paper
					sx={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<CheckCircleIcon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>承認済: {approvedCount}件</Box>
				</Paper>
				<Paper
					sx={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<PendingIcon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>承認待ち: {pendingCount + latePendingCount}件</Box>
				</Paper>
				<Paper
					sx={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<AnnouncementIcon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>未提出: {notSubmittedCount}件</Box>
				</Paper>
				<Paper
					sx={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<ErrorIcon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>再提出: {resubmissionCount}件</Box>
				</Paper>
				<Paper
					sx={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<CheckCircleOutlineIcon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>免除済み: {exemptionCount}件</Box>
				</Paper>
				<Paper
					sx={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box>
						<PendingIcon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>免除手続き中: {pendingExemptionApprovalCount + pendingExemptionCount}件</Box>
				</Paper>
			</Box>
		</Box>
	)
}
