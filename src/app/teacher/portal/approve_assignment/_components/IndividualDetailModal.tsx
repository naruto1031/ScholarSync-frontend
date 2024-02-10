import { submissionStatuses } from '@/app/student/portal/submission_status/_components/SubmissionStatusContents'
import { Issue, IssueCoverSearchCondition } from '@/types/api-response-types'
import { numberToBoolean } from '@/utils/numberToBoolean'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import { Dispatch, SetStateAction } from 'react'
import { scores } from './CollectiveDetailModal'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
	individualModalOpen: boolean
	setIndividualModalOpen: Dispatch<SetStateAction<boolean>>
	currentUpdateIssueCover: IssueCoverSearchCondition | null
	setCurrentUpdateIssueCover: Dispatch<SetStateAction<IssueCoverSearchCondition | null>>
	currentIssue: Issue | undefined
	isStatusUpdateLoading: boolean
	onSubmitIndividual: () => Promise<void>
}

export const IndividualDetailModal = ({
	currentUpdateIssueCover,
	individualModalOpen,
	setCurrentUpdateIssueCover,
	setIndividualModalOpen,
	currentIssue,
	isStatusUpdateLoading,
	onSubmitIndividual,
}: Props) => {
	const theme = useTheme()
	return (
		<Modal open={individualModalOpen} onClose={() => false}>
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
				<Box>個別評価設定</Box>
				<Box
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
						名前: {currentUpdateIssueCover?.student_name}
					</Box>
					<Box
						sx={{
							width: '150px',
						}}
					>
						学籍番号: {currentUpdateIssueCover?.registration_number}
					</Box>
					<Box
						sx={{
							width: '150px',
						}}
					>
						出席番号: {currentUpdateIssueCover?.attendance_number}
					</Box>
				</Box>
				<Box
					sx={{
						marginTop: '20px',
					}}
				>
					<FormControl sx={{ width: '200px' }} size='small'>
						<InputLabel id='status'>ステータス</InputLabel>
						<Select
							labelId='status'
							label='ステータス'
							value={currentUpdateIssueCover?.status}
							disabled={isStatusUpdateLoading}
							onChange={(e) => {
								const value = e.target.value
								setCurrentUpdateIssueCover((prev) => {
									if (!prev) return null
									return { ...prev, status: value }
								})
							}}
						>
							{submissionStatuses
								.filter((status) => status.value !== 'not_submitted')
								.map((status) => (
									<MenuItem key={status.value} value={`${status.value}`}>
										{status.label}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</Box>
				<Box
					sx={{
						marginTop: '20px',
					}}
				>
					<FormControl sx={{ width: '150px', my: '10px' }}>
						<InputLabel id='teacher-subjects' size='small'>
							評価
						</InputLabel>
						<Select
							labelId='teacher-subjects'
							label='担当教科'
							size='small'
							value={currentUpdateIssueCover?.evaluation}
							disabled={
								currentUpdateIssueCover?.status === 'resubmission' ||
								currentUpdateIssueCover?.status === 'rejected'
							}
							onChange={(e) => {
								const value = e.target.value
								setCurrentUpdateIssueCover((prev) => {
									if (!prev) return null
									return { ...prev, evaluation: value }
								})
							}}
						>
							{scores.map((evaluation) => (
								<MenuItem key={evaluation} value={`${evaluation}`}>
									{evaluation}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				{numberToBoolean(currentIssue?.challenge_flag) && (
					<Box
						sx={{
							marginTop: '20px',
						}}
					>
						<FormControl sx={{ width: '200px' }} size='small'>
							<InputLabel id='score'>チャレンジ問題スコア</InputLabel>
							<Select
								labelId='score'
								label='点数'
								value={currentUpdateIssueCover?.current_score}
								disabled={isStatusUpdateLoading}
								onChange={(e) => {
									const value = e.target.value
									setCurrentUpdateIssueCover((prev) => {
										if (!prev || !value) return null
										return { ...prev, current_score: value as number }
									})
								}}
							>
								{Array.from({
									length:
										currentIssue && currentIssue.challenge_max_score
											? currentIssue.challenge_max_score + 1
											: 1,
								})
									.sort()
									.map((_, index) => (
										<MenuItem key={index} value={index}>
											{index}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Box>
				)}
				{currentUpdateIssueCover?.status === 'resubmission' && (
					<Box
						sx={{
							marginTop: '20px',
						}}
					>
						<Box>
							<FormControl sx={{ width: '200px' }} size='small'>
								<DateTimePicker
									label='提出期限'
									ampm={false}
									timeSteps={{
										minutes: 1,
									}}
									value={
										(currentUpdateIssueCover.resubmission_deadline &&
											dayjs.utc(currentUpdateIssueCover.resubmission_deadline).tz('Asia/Tokyo')) ||
										null
									}
									onChange={(date: Dayjs | null) => {
										setCurrentUpdateIssueCover((prev) => {
											if (!prev) return null
											return {
												...prev,
												resubmission_deadline: date?.utc().format() || null,
											}
										})
									}}
									disabled={isStatusUpdateLoading}
								/>
							</FormControl>
						</Box>
						<Box
							sx={{
								marginTop: '20px',
							}}
						>
							<TextField
								required
								label='再提出コメント'
								variant='outlined'
								sx={{
									mt: '20px',
									mb: '20px',
									width: '400px',
								}}
								value={currentUpdateIssueCover.resubmission_comment}
								onChange={(e) => {
									const value = e.target.value
									setCurrentUpdateIssueCover((prev) => {
										if (!prev) return null
										return { ...prev, resubmission_comment: value }
									})
								}}
								disabled={isStatusUpdateLoading}
							/>
						</Box>
					</Box>
				)}
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
						onClick={() => setIndividualModalOpen(false)}
					>
						キャンセル
					</Button>
					<LoadingButton
						loading={isStatusUpdateLoading}
						variant='contained'
						onClick={onSubmitIndividual}
					>
						更新
					</LoadingButton>
				</Box>
			</Paper>
		</Modal>
	)
}
