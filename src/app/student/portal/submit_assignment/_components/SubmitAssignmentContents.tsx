'use client'
import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { SubmitModal } from './SubmitModal'
import { Issue, PendingIssuesResponse } from '@/types/api-response-types'
import InfoIcon from '@mui/icons-material/Info'
import { ConvertStatusIcon, Toast } from '@/app/components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
	issue_id?: string
	issueData: Issue[]
}

export const SubmitAssignmentContents = ({ issueData, issue_id }: Props) => {
	const [assignmentIssueData, setAssignmentIssueData] = useState<Issue[]>(issueData)
	const [isOpen, setIsOpen] = useState(false)
	const [currentTask, setCurrentTask] = useState<Issue | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isAbsenceLoading, setIsAbsenceLoading] = useState(false)
	const [isExemptionLoading, setIsExemptionLoading] = useState(false)
	const [isRegistered, setIsRegistered] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [submitStatus, setSubmitStatus] = useState<'normal' | 'exemption'>('normal')
	const [comment, setComment] = useState<string>('')

	useEffect(() => {
		const getAssignmentByIssueId = assignmentIssueData.find(
			(issue) => issue.issue_id === Number(issue_id),
		)
		if (issue_id && getAssignmentByIssueId) {
			setCurrentTask(getAssignmentByIssueId)
			setIsOpen(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleRegisterClose = () => {
		setIsRegistered(false)
	}

	const handleErrorClose = () => {
		setIsError(false)
	}

	const handleSubmission = async (id: number | undefined) => {
		const status =
			submitStatus === 'exemption'
				? 'pending_exemption_approval'
				: dayjs.utc(new Date()).tz('Asia/Tokyo') > dayjs.utc(currentTask?.due_date).tz('Asia/Tokyo')
				? 'late_pending'
				: 'pending'

		try {
			if (!id) return
			setIsLoading(true)
			const res = await fetch('/api/submit_assignment/register', {
				method: 'POST',
				body: JSON.stringify({
					issueId: id,
					status: status,
					comment,
				}),
			})
			if (!res.ok) {
				setIsError(true)
				return
			}
			if (res.status === 200) {
				setIsRegistered(true)
			}
			const data: PendingIssuesResponse = await res.json()
			setAssignmentIssueData(data.issues)
			handleClose()
			setIsLoading(false)
		} catch (error) {
			console.error('Submission error:', error)
			setIsError(true)
			return
		}
	}

	const handleOpen = (row: Issue) => {
		setCurrentTask(row)
		setIsOpen(true)
	}

	const handleClose = () => {
		setCurrentTask(null)
		setIsOpen(false)
	}

	const handleAbsenceApplication = async (id: number | undefined) => {
		try {
			if (!id) return
			setIsAbsenceLoading(true)
			await fetch('/api/submit_assignment/absence', {
				method: 'POST',
				body: JSON.stringify({
					issueId: id,
				}),
			})
			alert('公欠申請が完了しました')
			handleClose()
			setIsAbsenceLoading(false)
		} catch (error) {
			alert('エラーが発生しました')
			return
		}
	}

	const handleExemptionApplication = async (id: number | undefined) => {
		try {
			if (!id) return
			setIsExemptionLoading(true)
			await fetch('/api/submit_assignment/exemption', {
				method: 'POST',
				body: JSON.stringify({
					issueId: id,
				}),
			})
			alert('免除申請が完了しました')
			handleClose()
			setIsExemptionLoading(false)
		} catch (error) {
			alert('エラーが発生しました')
			return
		}
	}
	const theme = useTheme()

	return (
		<Container
			maxWidth='lg'
			sx={{
				py: '50px',
			}}
		>
			<Box display={'flex'} width={'100%'} alignItems={'center'}>
				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '20px',
					}}
				>
					提出可能な課題総数: {assignmentIssueData.length}件
				</Box>
			</Box>
			<Box
				sx={{
					gap: '20px',
					mt: '20px',
					fontSize: '20px',
					[theme.breakpoints.up('sm')]: {
						display: 'none',
					},
				}}
			>
				{assignmentIssueData.length === 0 ? (
					<Paper
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<InfoIcon
							sx={{
								color: '#929292',
							}}
						/>
						<span>提出可能な課題はありません</span>
					</Paper>
				) : (
					<Box>
						{assignmentIssueData.map((row) => (
							<Paper
								key={row.issue_id}
								sx={{
									padding: '20px',
									mb: '20px',
								}}
								onClick={() => handleOpen(row)}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Box>
										<Box
											sx={{
												fontSize: '16px',
												fontWeight: 'bold',
											}}
										>
											{row.subject_name}
										</Box>
										<Box
											sx={{
												fontSize: '14px',
												color: '#929292',
											}}
										>
											課題No: {row.task_number}
										</Box>
									</Box>
									<Box
										sx={{
											fontSize: '14px',
											color: '#929292',
										}}
									>
										{dayjs.utc(new Date()).tz('Asia/Tokyo') >
										dayjs.utc(row.due_date).tz('Asia/Tokyo') ? (
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													width: 'fit-content',
													gap: '5px',
												}}
											>
												<Box
													sx={{
														mb: '1px',
													}}
												>
													<ConvertStatusIcon status='overdue' />
												</Box>
												<span style={{ color: 'red' }}>
													{row.due_date
														? dayjs.utc(row.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
														: '未設定'}
												</span>
											</Box>
										) : (
											<span>
												{row.due_date
													? dayjs.utc(row.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
													: '未設定'}
											</span>
										)}
									</Box>
								</Box>
								<Box>
									<Box
										sx={{
											fontSize: '16px',
											fontWeight: 'bold',
											mt: '10px',
										}}
									>
										{row.name}
									</Box>
								</Box>
							</Paper>
						))}
					</Box>
				)}
			</Box>

			<Paper
				sx={{
					maxHeight: '400px',
					overflow: 'hidden auto',
					mt: '20px',
					[theme.breakpoints.down('sm')]: {
						display: 'none',
					},
				}}
			>
				<TableContainer>
					<Table aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>科目記号</TableCell>
								<TableCell align='right'>課題No</TableCell>
								<TableCell align='right'>課題主題</TableCell>
								<TableCell align='right'>納期</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{assignmentIssueData.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										align='center'
										sx={{
											fontSize: '20px',
											fontWeight: 'bold',
											color: '#929292',
											alignItems: 'center',
										}}
									>
										<span>
											<InfoIcon
												sx={{
													verticalAlign: 'middle',
													color: '#929292',
													mr: '5px',
													mb: '5px',
												}}
											/>
										</span>
										提出可能な課題はありません
									</TableCell>
								</TableRow>
							) : (
								assignmentIssueData.map((row) => (
									<TableRow
										key={row.issue_id}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
											cursor: 'pointer',
											'&:hover': { backgroundColor: '#F5F5F5' },
										}}
										onClick={() => handleOpen(row)}
									>
										<TableCell component='th' scope='row'>
											{row.subject_name}
										</TableCell>
										<TableCell align='right'>{row.task_number}</TableCell>
										<TableCell align='right'>{row.name}</TableCell>
										<TableCell align='right'>
											{dayjs.utc(new Date()).tz('Asia/Tokyo') >
											dayjs.utc(row.due_date).tz('Asia/Tokyo') ? (
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														width: 'fit-content',
														gap: '5px',
														ml: 'auto',
													}}
												>
													<Box
														sx={{
															mb: '1px',
														}}
													>
														<ConvertStatusIcon status='overdue' />
													</Box>
													<span style={{ color: 'red' }}>
														{row.due_date
															? dayjs.utc(row.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
															: '未設定'}
													</span>
												</Box>
											) : (
												<Box
													sx={{
														py: '5px',
													}}
												>
													{row.due_date
														? dayjs.utc(row.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
														: '未設定'}
												</Box>
											)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
						<SubmitModal
							data={currentTask}
							isOpen={isOpen}
							isLoading={isLoading}
							isLate={
								dayjs.utc(new Date()).tz('Asia/Tokyo') >
								dayjs.utc(currentTask?.due_date).tz('Asia/Tokyo')
							}
							comment={comment}
							setComment={setComment}
							submitStatus={submitStatus}
							isAbsenceLoading={isAbsenceLoading}
							isExemptionLoading={isExemptionLoading}
							setSubmitStatus={setSubmitStatus}
							handleClose={handleClose}
							handleSubmit={handleSubmission}
							handleAbsenceApplication={handleAbsenceApplication}
							handleExemptionApplication={handleExemptionApplication}
						/>
					</Table>
				</TableContainer>
			</Paper>
			<Toast
				message='登録しました'
				severity='success'
				open={isRegistered}
				handleClose={handleRegisterClose}
			/>
			<Toast
				message='登録に失敗しました'
				severity='error'
				open={isError}
				handleClose={handleErrorClose}
			/>
		</Container>
	)
}
