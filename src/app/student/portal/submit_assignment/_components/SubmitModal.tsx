'use client'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Issue } from '@/types/api-response-types'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
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
	handleClose: () => void
	handleSubmit: (id: number | undefined) => void
	handleAbsenceApplication: (id: number | undefined) => void
	handleExemptionApplication: (id: number | undefined) => void
}

export const SubmitModal = ({
	data,
	isOpen,
	isLate,
	handleClose,
	handleSubmit,
	handleExemptionApplication,
	isLoading,
	isExemptionLoading,
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
					<Box>{data?.subject_name}</Box>
					<Box>課題No.{data?.task_number}</Box>
					<Box sx={{ display: 'flex', gap: '6px', ml: 'auto' }}>
						<LoadingButton
							variant='outlined'
							color='secondary'
							size='small'
							loading={isExemptionLoading}
							onClick={() => handleExemptionApplication(data?.issue_id)}
						>
							免除申請
						</LoadingButton>
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
					}}
				>
					{isLate ? (
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
								期限超過しています:{' '}
								{dayjs.utc(data?.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')}
							</span>
						</Box>
					) : (
						<Box>
							<span>
								提出期限: {dayjs.utc(data?.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')}
							</span>
						</Box>
					)}
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
							label='課題は提出済みです'
						/>
					</FormGroup>
				</Box>
				<Box
					sx={{
						mt: '20px',
						marginBottom: '40px',
					}}
				>
					<TextField id='standard-basic' label='一言メッセージ' variant='standard' fullWidth />
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
								if (!isChecked) return
								handleSubmit(data?.issue_id)
							}}
							disabled={!isChecked}
							color={isLate ? 'error' : 'primary'}
						>
							課題を提出する
						</LoadingButton>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}
