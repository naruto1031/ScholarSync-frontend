import { IssueCoverSearchCondition } from '@/types/api-response-types'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { Dispatch, SetStateAction, useState } from 'react'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
	issueCoverData: IssueCoverSearchCondition[]
	isOpen: boolean
	modalStatus: 'approved' | 'reject'
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	currentScore: number
	setCurrentScore: Dispatch<SetStateAction<number>>
	onSubmitCollective: (status: string) => Promise<void>
	isSetEvaluation: boolean
	setIsSetEvaluation: Dispatch<SetStateAction<boolean>>
	resubmissionDueDate: string | null
	setResubmissionDueDate: Dispatch<SetStateAction<string | null>>
	resubmissionComment: string
	setResubmissionComment: Dispatch<SetStateAction<string>>
	isStatusUpdateLoading: boolean
}

export const CollectiveDetailModal = ({
	isOpen,
	modalStatus,
	setIsModalOpen,
	issueCoverData,
	currentScore,
	setCurrentScore,
	onSubmitCollective,
	isSetEvaluation,
	setIsSetEvaluation,
	resubmissionComment,
	resubmissionDueDate,
	setResubmissionComment,
	setResubmissionDueDate,
	isStatusUpdateLoading,
}: Props) => {
	const theme = useTheme()
	const scores = Array.from({ length: 21 }, (_, i) => i * 5).sort((a, b) => b - a)
	const [isRejectStatus, setIsRejectStatus] = useState<'resubmission' | 'rejected'>('resubmission')

	return (
		<Modal open={isOpen} onClose={() => false}>
			<Paper
				sx={{
					maxWidth: '700px',
					width: '100%',
					maxHeight: '80%',
					overflow: 'auto',
					position: 'absolute',
					top: '50%',
					left: '50%',
					boxShadow: '0px 0px 15px -5px #777777',
					borderRadius: '10px',
					transform: 'translate(-50%, -50%)',
					backgroundColor: '#fff',
					border: 'none',
					padding: '30px 60px',
					'&:focus': {
						outline: 'none',
					},
					'&:active': {
						outline: 'none',
					},
					[theme.breakpoints.down('md')]: {
						maxWidth: '70%',
						padding: '20px 30px',
					},
					[theme.breakpoints.down('sm')]: {
						padding: '15px 20px',
					},
				}}
			>
				{modalStatus === 'approved' && (
					<Box>
						<Box
							sx={{
								fontSize: '30px',
								fontWeight: 'bold',
								marginBottom: '20px',
							}}
						>
							一括承認モーダル
						</Box>
						<Box>
							<Box>下記{issueCoverData.length}名の生徒の課題表紙を一括承認します</Box>
							<Box
								sx={{
									border: '1px solid #ccc',
									padding: '10px',
									borderRadius: '10px',
									marginTop: '20px',
									width: 'fit-content',
								}}
							>
								<RadioGroup
									aria-label='has-class'
									name='has-class'
									value={isSetEvaluation}
									onChange={(_, value) => {
										setIsSetEvaluation(value === 'true')
									}}
								>
									<Box
										sx={{
											fontWeight: 'bold',
											marginBottom: '10px',
										}}
									>
										評価を設定しますか？
									</Box>
									<FormControlLabel
										value={false}
										control={<Radio disabled={isStatusUpdateLoading} />}
										label='いいえ'
									/>
									<FormControlLabel
										value={true}
										control={<Radio disabled={isStatusUpdateLoading} />}
										label='はい'
									/>
								</RadioGroup>

								{isSetEvaluation && (
									<FormControl sx={{ width: '150px', my: '10px' }}>
										<InputLabel id='teacher-subjects' size='small'>
											評価
										</InputLabel>
										<Select
											labelId='teacher-subjects'
											label='担当教科'
											size='small'
											value={currentScore}
											disabled={isStatusUpdateLoading}
											onChange={(e) => {
												setCurrentScore(Number(e.target.value))
											}}
										>
											{scores.map((evaluation) => (
												<MenuItem key={evaluation} value={`${evaluation}`}>
													{evaluation}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</Box>
							{issueCoverData.map((issueCover, index) => (
								<Box
									key={index}
									sx={{
										border: '1px solid #ccc',
										padding: '10px',
										borderRadius: '10px',
										marginTop: '10px',
										display: 'flex',
										gap: '20px',
										alignItems: 'center',
									}}
								>
									<Box
										sx={{
											width: '150px',
										}}
									>
										名前: {issueCover.student_name}
									</Box>
									<Box
										sx={{
											width: '150px',
										}}
									>
										学籍番号: {issueCover.registration_number}
									</Box>
									<Box
										sx={{
											width: '150px',
										}}
									>
										出席番号: {issueCover.attendance_number}
									</Box>
								</Box>
							))}
						</Box>
						<Box
							sx={{
								display: 'flex',
								gap: '40px',
								justifyContent: 'right',
								marginTop: '20px',
							}}
						>
							<Button
								disabled={isStatusUpdateLoading}
								variant='outlined'
								onClick={() => setIsModalOpen(false)}
							>
								キャンセル
							</Button>
							<LoadingButton
								disabled={isStatusUpdateLoading}
								variant='contained'
								onClick={() => onSubmitCollective('approved')}
							>
								承認
							</LoadingButton>
						</Box>
					</Box>
				)}
				{modalStatus === 'reject' && (
					<Box>
						<Box
							sx={{
								fontSize: '30px',
								fontWeight: 'bold',
								marginBottom: '20px',
							}}
						>
							一括差戻し・拒否モーダル
						</Box>
						<Box>
							<Box
								sx={{
									border: '1px solid #ccc',
									padding: '10px',
									borderRadius: '10px',
									marginTop: '20px',
									mb: '20px',
									width: 'fit-content',
								}}
							>
								<RadioGroup
									aria-label='has-class'
									name='has-class'
									value={isRejectStatus}
									onChange={(_, value) => {
										if (value !== 'resubmission' && value !== 'rejected') return
										setIsRejectStatus(value)
									}}
								>
									<Box
										sx={{
											fontWeight: 'bold',
											marginBottom: '10px',
										}}
									>
										ステータス設定
									</Box>
									<FormControlLabel
										value={'resubmission'}
										control={<Radio disabled={isStatusUpdateLoading} />}
										label='差戻し'
									/>
									<FormControlLabel
										value={'rejected'}
										control={<Radio disabled={isStatusUpdateLoading} />}
										label='拒否'
									/>
								</RadioGroup>

								{isRejectStatus === 'resubmission' && (
									<Box>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												mt: '20px',
												[theme.breakpoints.down('sm')]: {
													flexDirection: 'column',
													textAlign: 'left',
												},
											}}
										>
											<DateTimePicker
												label='提出期限'
												ampm={false}
												timeSteps={{
													minutes: 1,
												}}
												value={
													(resubmissionDueDate &&
														dayjs.utc(resubmissionDueDate).tz('Asia/Tokyo')) ||
													null
												}
												onChange={(date: Dayjs | null) => {
													setResubmissionDueDate(date?.utc().format() || null)
												}}
												disabled={isStatusUpdateLoading}
											/>
										</Box>
										<Box>
											<TextField
												required
												label='再提出コメント'
												variant='outlined'
												sx={{
													mt: '20px',
													mb: '20px',
													width: '400px',
												}}
												value={resubmissionComment}
												onChange={(e) => setResubmissionComment(e.target.value)}
												disabled={isStatusUpdateLoading}
											/>
										</Box>
									</Box>
								)}
							</Box>
							<Box>
								下記{issueCoverData.length}名の生徒の課題表紙を一括
								<span style={{ fontWeight: 'bold' }}>
									{isRejectStatus === 'rejected' ? '拒否' : '差戻し'}
								</span>
								します
							</Box>
							{issueCoverData.map((issueCover, index) => (
								<Box
									key={index}
									sx={{
										border: '1px solid #ccc',
										padding: '10px',
										borderRadius: '10px',
										marginTop: '10px',
										display: 'flex',
										gap: '20px',
										alignItems: 'center',
									}}
								>
									<Box
										sx={{
											width: '150px',
										}}
									>
										名前: {issueCover.student_name}
									</Box>
									<Box
										sx={{
											width: '150px',
										}}
									>
										学籍番号: {issueCover.registration_number}
									</Box>
									<Box
										sx={{
											width: '150px',
										}}
									>
										出席番号: {issueCover.attendance_number}
									</Box>
								</Box>
							))}
						</Box>
						<Box
							sx={{
								display: 'flex',
								gap: '40px',
								justifyContent: 'right',
								marginTop: '20px',
							}}
						>
							<Button
								disabled={isStatusUpdateLoading}
								variant='outlined'
								onClick={() => setIsModalOpen(false)}
							>
								キャンセル
							</Button>
							<LoadingButton
								color='error'
								variant='contained'
								disabled={isStatusUpdateLoading}
								onClick={() => onSubmitCollective(isRejectStatus)}
							>
								{isRejectStatus === 'resubmission' ? '一括差戻し' : '一括拒否'}
							</LoadingButton>
						</Box>
					</Box>
				)}
			</Paper>
		</Modal>
	)
}
