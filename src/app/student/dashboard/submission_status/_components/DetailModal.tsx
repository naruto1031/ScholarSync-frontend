'use client'
import { IssueCover } from '@/types/api-response-types'
import {
	Box,
	Button,
	Modal,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Paper,
	Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { submissionStatuses } from './SubmissionStatusContents'
import { useRouter } from 'next/navigation'
import { numberToBoolean } from '@/utils/numberToBoolean'
interface Props {
	isOpen: boolean
	currentSubmissionData: IssueCover | null
	handleClose: () => void
}

const steps = ['申請', '承認待ち', '承認済み']

const currentStep = (step: string | undefined): number => {
	const currentStep = submissionStatuses.find((status) => status.value === step)
	return currentStep ? currentStep.step : 0
}

export const DetailModal = ({ isOpen, currentSubmissionData, handleClose }: Props) => {
	const theme = useTheme()
	const router = useRouter()
	return (
		<Modal open={isOpen} onClose={() => false}>
			<Paper
				sx={{
					maxWidth: '700px',
					width: '100%',
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
				<Box sx={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
					<Box>{currentSubmissionData?.subject}</Box>
					<Box>課題No.{currentSubmissionData?.task_number}</Box>
				</Box>
				<Box
					sx={{
						fontSize: '32px',
						fontWeight: 'bold',
					}}
				>
					<Box>{currentSubmissionData?.name}</Box>
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						color: '#929292',
					}}
				>
					<Box>提出期限: {currentSubmissionData?.due_date}</Box>
				</Box>
				<Box
					sx={{
						marginTop: '40px',
						marginBottom: '40px',
					}}
				>
					<Box sx={{ width: '100%' }}>
						<Stepper activeStep={currentStep(currentSubmissionData?.status)} alternativeLabel>
							{steps.map((label, index) => {
								const labelProps: {
									optional?: React.ReactNode
									error?: boolean
								} = {}
								if (index === 1 && currentSubmissionData?.status === 'resubmission') {
									labelProps.error = true
									label = '再提出'
								}
								if (index === 0 && currentSubmissionData?.status === 'rejected') {
									labelProps.error = true
									label = '提出不可'
								}
								return (
									<Step
										key={label}
										sx={{
											'& .MuiStepLabel-root .Mui-completed': {
												color: '#4caf50',
											},
										}}
									>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								)
							})}
						</Stepper>
					</Box>
					{currentSubmissionData?.evaluation && (
						<Box>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
								<Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>
									評価: {currentSubmissionData.evaluation}点
								</Box>
							</Box>
						</Box>
					)}
					{numberToBoolean(currentSubmissionData?.challenge_flag) && (
						<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: '20px' }}>
							<Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>
								チャレンジ問題スコア: {currentSubmissionData?.current_score}点
							</Box>
						</Box>
					)}
				</Box>
				<Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
					<Box sx={{ display: 'flex', gap: '20px', ml: 'auto' }}>
						<Button variant='text' onClick={handleClose} size='large'>
							{currentSubmissionData?.status === 'approved' ||
							currentSubmissionData?.status === 'pending'
								? '閉じる'
								: 'キャンセル'}
						</Button>
						{currentSubmissionData?.status === 'not_submitted' && (
							<Button
								variant='contained'
								size='large'
								onClick={() => router.push('/student/dashboard/submit_assignment')}
							>
								課題表紙の提出画面へ
							</Button>
						)}
					</Box>
				</Box>
			</Paper>
		</Modal>
	)
}
