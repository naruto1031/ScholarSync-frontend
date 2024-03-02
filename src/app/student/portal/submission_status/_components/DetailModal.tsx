'use client'
import { IssueCover } from '@/types/api-response-types'
import {
	Box,
	Button,
	Modal,
	Step,
	StepLabel,
	Stepper,
	Paper,
	FormControlLabel,
	FormGroup,
	Checkbox,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { submissionStatuses } from './SubmissionStatusContents'
import { useRouter } from 'next/navigation'
import { numberToBoolean } from '@/utils/numberToBoolean'
import { LoadingButton } from '@mui/lab'
import { ReactNode, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
interface Props {
	isOpen: boolean
	isResubmissionLoading: boolean
	currentSubmissionData: IssueCover | null
	handleClose: () => void
	updateSubmissionAssignment: () => void
}

const steps = ['申請', '承認待ち', '承認済み']
const exemptionSteps = ['申請', '免除申請許可待ち', '免除申請中', '免除']
const exemptionStatuses = ['pending_exemption_approval', 'pending_exemption', 'exemption']

const currentStep = (step: string | undefined): number => {
	const currentStep = submissionStatuses.find((status) => status.value === step)
	return currentStep ? currentStep.step : 0
}

export const DetailModal = ({
	isOpen,
	currentSubmissionData,
	handleClose,
	updateSubmissionAssignment,
	isResubmissionLoading,
}: Props) => {
	const [isChecked, setIsChecked] = useState(false)
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
					}}
				>
					{currentSubmissionData?.status === 'resubmission' ? (
						<Box>
							再提出期限:{' '}
							{dayjs
								.utc(currentSubmissionData?.resubmission_deadline)
								.tz('Asia/Tokyo')
								.format('YYYY-MM-DD HH:mm')}
						</Box>
					) : (
						<Box>
							提出期限:{' '}
							{dayjs
								.utc(currentSubmissionData?.due_date)
								.tz('Asia/Tokyo')
								.format('YYYY-MM-DD HH:mm')}
						</Box>
					)}
				</Box>
				<Box
					sx={{
						marginTop: '40px',
						marginBottom: '40px',
					}}
				>
					<Box sx={{ width: '100%' }}>
						<Stepper activeStep={currentStep(currentSubmissionData?.status)} alternativeLabel>
							{!exemptionStatuses.includes(currentSubmissionData?.status || '')
								? steps.map((label, index) => {
										const labelProps: {
											optional?: ReactNode
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
								  })
								: exemptionSteps.map((label) => (
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
					{currentSubmissionData?.status === 'approved' && currentSubmissionData?.evaluation && (
						<Box>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
								<Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>
									評価: {currentSubmissionData.evaluation}点
								</Box>
							</Box>
						</Box>
					)}
					{numberToBoolean(currentSubmissionData?.challenge_flag) &&
						currentSubmissionData?.current_score && (
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: '20px' }}>
								<Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>
									チャレンジ問題スコア: {currentSubmissionData?.current_score}点
								</Box>
							</Box>
						)}
				</Box>
				<Box sx={{ width: '100%' }}>
					{currentSubmissionData?.status === 'resubmission' && (
						<Box sx={{ my: '20px', fontSize: '20px' }}>
							<Box>
								<span>講師からのコメント:</span> {currentSubmissionData.resubmission_comment}
							</Box>
							<Box
								sx={{
									marginTop: '10px',
									width: 'fit-content',
								}}
							>
								<FormGroup>
									<FormControlLabel
										required
										control={<Checkbox onChange={() => setIsChecked((prev) => !prev)} />}
										label='課題は再提出済みです'
									/>
								</FormGroup>
							</Box>
						</Box>
					)}
					<Box sx={{ display: 'flex', gap: '20px', ml: 'auto', width: 'fit-content' }}>
						<Button
							variant='text'
							onClick={() => {
								handleClose()
								setIsChecked(false)
							}}
							size='large'
						>
							{currentSubmissionData?.status === 'approved' ||
							currentSubmissionData?.status === 'pending'
								? '閉じる'
								: 'キャンセル'}
						</Button>
						{currentSubmissionData?.status === 'not_submitted' && (
							<Button
								variant='contained'
								size='large'
								onClick={() =>
									router.push(
										`/student/portal/submit_assignment?issue_id=${currentSubmissionData?.issue_id}`,
									)
								}
							>
								課題表紙の提出画面へ
							</Button>
						)}
						{currentSubmissionData?.status === 'resubmission' && (
							<LoadingButton
								variant='contained'
								disabled={!isChecked}
								loading={isResubmissionLoading}
								onClick={updateSubmissionAssignment}
							>
								再提出する
							</LoadingButton>
						)}
					</Box>
				</Box>
			</Paper>
		</Modal>
	)
}
