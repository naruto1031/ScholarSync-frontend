'use client'
import { IssueCover } from '@/app/types/apiResponseTypes'
import { Box, Button, Modal, Step, StepLabel, Stepper, TextField, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { submissionStatuses } from './SubmissionStatusContents'
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
					// レスポンシブスタイル
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
						marginTop: '10px',
						marginBottom: '40px',
					}}
				>
					<Box sx={{ width: '100%' }}>
						<Stepper activeStep={currentStep(currentSubmissionData?.status)} alternativeLabel>
							{steps.map((label) => (
								<Step
									key={label}
									sx={{
										'& .MuiStepLabel-root .Mui-completed': {
											color: '#4caf50',
										},
									}}
								>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
				</Box>
				<Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
					<Box sx={{ display: 'flex', gap: '20px', ml: 'auto' }}>
						<Button variant='text' onClick={handleClose} size='large'>
							キャンセル
						</Button>
					</Box>
				</Box>
			</Paper>
		</Modal>
	)
}
