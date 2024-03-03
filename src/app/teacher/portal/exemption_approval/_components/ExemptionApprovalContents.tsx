'use client'

import { ConvertStatusIcon, Toast } from '@/app/components'
import {
	ExemptionIssueCover,
	ExemptionIssueCoverResponse,
	TeacherClass,
} from '@/types/api-response-types'
import { convertStatus } from '@/utils/statusUtils'
import { Info } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import { ApproveModal } from './ApproveModal'

interface Props {
	teacherClasses: TeacherClass[]
}
export const ExemptionApprovalContents = ({ teacherClasses }: Props) => {
	const [currentClassId, setCurrentClassId] = useState<string>('')
	const [issueCoverData, setIssueCoverData] = useState<ExemptionIssueCover[]>([])
	const [currentUpdateIssueCover, setCurrentUpdateIssueCover] =
		useState<ExemptionIssueCover | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const handleSearchAssignment = async () => {
		try {
			setIsLoading(true)
			const res = await fetch(`/api/class_assignment/exemption/${currentClassId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (!res.ok) {
				setIsError(true)
				throw new Error(res.statusText)
			}
			const data: ExemptionIssueCoverResponse = await res.json()
			setIssueCoverData(data.issue_covers)
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message)
			}
		}
		setIsLoading(false)
	}

	const onOpenModalOpen = (issueCover: ExemptionIssueCover) => {
		setCurrentUpdateIssueCover(issueCover)
		setModalOpen(true)
	}

	const onSubmit = async () => {
		try {
			setIsLoading(true)
			const res = await fetch(`/api/approve_assignment/individual`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					issue_cover_id: `${currentUpdateIssueCover?.issue_cover_id}`,
					status: 'pending_exemption',
				}),
			})
			if (!res.ok) {
				setIsError(true)
				throw new Error(res.statusText)
			}

			const exemptionRes = await fetch(`/api/class_assignment/exemption/${currentClassId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!exemptionRes.ok) {
				setIsError(true)
				throw new Error(exemptionRes.statusText)
			}
			const data: ExemptionIssueCoverResponse = await exemptionRes.json()
			setIssueCoverData(data.issue_covers)
			setCurrentUpdateIssueCover(null)
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message)
				setIsError(true)
			}
		}
		setIsLoading(false)
		setIsSuccess(true)
		setModalOpen(false)
	}

	return (
		<Box>
			<Paper
				sx={{
					mt: '20px',
					gap: '20px',
					padding: '20px',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Box>
					<FormControl sx={{ width: '200px' }} size='small'>
						<InputLabel id='teacher-subjects'>担任クラス</InputLabel>
						<Select
							labelId='teacher-subjects'
							label='担当クラス'
							defaultValue={''}
							value={currentClassId}
							onChange={(e) => setCurrentClassId(e.target.value)}
						>
							{teacherClasses.map((classData) => (
								<MenuItem key={classData.class_teacher_id} value={`${classData.class_id}`}>
									{classData.class_name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box>
					<LoadingButton loading={isLoading} variant='contained' onClick={handleSearchAssignment}>
						検索
					</LoadingButton>
				</Box>
			</Paper>
			<TableContainer
				component={Paper}
				sx={{
					mt: '20px',
					maxHeight: '450px',
					overflow: 'hidden auto',
				}}
			>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>出席番号</TableCell>
							<TableCell align='right'>学籍番号</TableCell>
							<TableCell align='right'>名前</TableCell>
							<TableCell align='right'>学科名</TableCell>
							<TableCell align='right'>課題名</TableCell>
							<TableCell align='right'>ステータス</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={6}
									align='center'
									sx={{
										fontSize: '20px',
										fontWeight: 'bold',
										color: '#929292',
										alignItems: 'center',
									}}
								>
									<span>
										<CircularProgress
											sx={{
												verticalAlign: 'middle',
												color: '#929292',
												mr: '5px',
												mb: '5px',
											}}
											size={20}
										/>
									</span>
									生徒を検索中です
								</TableCell>
							</TableRow>
						) : issueCoverData.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									align='center'
									sx={{
										fontSize: '20px',
										fontWeight: 'bold',
										color: '#929292',
										alignItems: 'center',
									}}
								>
									<span>
										<Info
											sx={{
												verticalAlign: 'middle',
												color: '#929292',
												mr: '5px',
												mb: '5px',
											}}
										/>
									</span>
									表示可能な生徒情報がありません
								</TableCell>
							</TableRow>
						) : (
							issueCoverData.map((issueCover) => (
								<TableRow
									key={issueCover.issue_id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										cursor: 'pointer',
										'&:hover': {
											backgroundColor: '#F5F5F5',
										},
									}}
									onClick={() => {
										onOpenModalOpen(issueCover)
									}}
								>
									<TableCell>{issueCover.attendance_number}</TableCell>
									<TableCell align='right'>{issueCover.registration_number}</TableCell>
									<TableCell align='right'>{issueCover.student_name}</TableCell>
									<TableCell align='right'>{issueCover.subject}</TableCell>
									<TableCell align='right'>{issueCover.name}</TableCell>

									<TableCell
										align='right'
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px',
										}}
									>
										<Box>{convertStatus(issueCover.status)}</Box>
										<span>
											<ConvertStatusIcon status={issueCover.status} />
										</span>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<ApproveModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				currentUpdateIssueCover={currentUpdateIssueCover}
				setCurrentUpdateIssueCover={setCurrentUpdateIssueCover}
				isStatusUpdateLoading={isLoading}
				onSubmit={onSubmit}
			/>
			<Toast
				open={isError}
				handleClose={() => setIsError(false)}
				severity='error'
				message='エラーが発生しました'
			/>
			<Toast
				open={isSuccess}
				handleClose={() => setIsSuccess(false)}
				severity='success'
				message='免除情報を更新しました'
			/>
		</Box>
	)
}
