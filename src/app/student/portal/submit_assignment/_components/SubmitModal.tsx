'use client'
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Modal,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Issue } from '@/types/api-response-types'
import { useTheme } from '@mui/material/styles'
import { Dispatch, SetStateAction, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { ConvertStatusIcon } from '@/app/components'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
	data: Issue | null
	isOpen: boolean
	isLoading: boolean
	isAbsenceLoading: boolean
	isLate: boolean
	isExemptionLoading: boolean
	submitStatus: 'normal' | 'exemption'
	comment: string
	setComment: Dispatch<SetStateAction<string>>
	handleClose: () => void
	handleSubmit: (id: number | undefined) => void
	handleAbsenceApplication: (id: number | undefined) => void
	handleExemptionApplication: (id: number | undefined) => void
	setSubmitStatus: Dispatch<SetStateAction<'normal' | 'exemption'>>
}

export const SubmitModal = ({
	data,
	isOpen,
	isLate,
	submitStatus,
	handleClose,
	handleSubmit,
	setSubmitStatus,
	isLoading,
	comment,
	setComment,
}: Props) => {
	const theme = useTheme()
	const [isChecked, setIsChecked] = useState(false)
	return (
		<Modal open={isOpen} onClose={() => false} sx={{ border: 'none' }}>
			<Box
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
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '20px',
						fontSize: '20px',
						[theme.breakpoints.down('sm')]: {
							alignItems: 'start',
							gap: '0px',
							flexDirection: 'column',
						},
					}}
				>
					<Box>{data?.subject_name}</Box>
					<Box>課題No.{data?.task_number}</Box>
					<Box
						sx={{
							display: 'flex',
							gap: '6px',
							ml: 'auto',
							[theme.breakpoints.down('sm')]: {
								ml: '0',
							},
						}}
					>
						<FormControl>
							<RadioGroup
								row
								aria-labelledby='radio-buttons-group'
								name='radio-buttons-group'
								value={submitStatus}
								onChange={(e) =>
									(e.target.value === 'exemption' || e.target.value === 'normal') &&
									setSubmitStatus(e.target.value)
								}
							>
								<FormControlLabel
									labelPlacement='end'
									value='normal'
									control={<Radio />}
									label='通常申請'
								/>
								<FormControlLabel
									labelPlacement='end'
									value='exemption'
									control={<Radio />}
									label='免除申請'
								/>
							</RadioGroup>
						</FormControl>
					</Box>
				</Box>
				<Box
					sx={{
						fontSize: '32px',
						fontWeight: 'bold',
					}}
				>
					{data?.name}
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						color: '#929292',
						[theme.breakpoints.down('sm')]: {
							fontSize: '16px',
						},
					}}
				>
					{isLate ? (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								width: 'fit-content',
								gap: '5px',
								my: '10px',
							}}
						>
							<Box
								sx={{
									mb: '1px',
								}}
							>
								<ConvertStatusIcon status='overdue' />
							</Box>

							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									color: 'red',
									[theme.breakpoints.down('sm')]: {
										flexDirection: 'column',
										gap: '5px',
										alignItems: 'start',
									},
								}}
							>
								<Box>期限超過しています:</Box>
								{data?.due_date
									? dayjs.utc(data?.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
									: '未設定'}
							</Box>
						</Box>
					) : (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '5px',
								my: '10px',
								[theme.breakpoints.down('sm')]: {
									flexDirection: 'column',
									gap: '5px',
									alignItems: 'start',
								},
							}}
						>
							<Box>提出期限:</Box>
							{data?.due_date
								? dayjs.utc(data?.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
								: '未設定'}
						</Box>
					)}
				</Box>
				{submitStatus === 'normal' && (
					<Box
						sx={{
							marginTop: '10px',
							width: 'fit-content',
						}}
					>
						<FormGroup>
							<FormControlLabel
								required={submitStatus === 'normal'}
								control={<Checkbox onChange={() => setIsChecked((prev) => !prev)} />}
								label='課題は提出済みです'
							/>
						</FormGroup>
					</Box>
				)}
				<Box
					sx={{
						mt: submitStatus === 'exemption' ? `20px` : `0px`,
						mb: '40px',
					}}
				>
					<Box
						sx={{
							color: submitStatus === 'exemption' ? 'red' : 'inherit',
							fontSize: '16px',
							fontWeight: 'bold',
							mb: `10px`,
						}}
					>
						{submitStatus === 'exemption' ? '免除申請の場合、申請理由を必ず記入してください' : ''}
					</Box>
					<TextField
						id='standard-basic'
						label={submitStatus === 'exemption' ? '申請理由' : '一言メッセージ（任意）'}
						variant='standard'
						fullWidth
						sx={{
							mt: submitStatus === 'exemption' ? `10px` : `0px`,
						}}
						onChange={(e) => setComment(e.target.value)}
					/>
				</Box>
				<Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
					<Box sx={{ display: 'flex', gap: '20px', ml: 'auto' }}>
						<Button
							variant='text'
							onClick={() => {
								setIsChecked(false)
								handleClose()
							}}
							size='large'
						>
							キャンセル
						</Button>
						<LoadingButton
							loading={isLoading}
							variant='contained'
							size='large'
							onClick={() => {
								if (!isChecked && submitStatus === 'normal') return
								handleSubmit(data?.issue_id)
							}}
							disabled={
								(!isChecked && submitStatus === 'normal') ||
								isLoading ||
								(submitStatus === 'exemption' && comment.length === 0)
							}
							color={submitStatus === 'exemption' ? 'secondary' : isLate ? 'error' : 'primary'}
						>
							{submitStatus === 'exemption' ? '免除申請' : '提出'}
						</LoadingButton>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}
