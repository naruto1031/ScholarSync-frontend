'use client'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Issue } from '@/app/types/apiResponseTypes'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

interface Props {
	data: Issue | null
	isOpen: boolean
	isLoading: boolean
	isAbsenceLoading: boolean
	isExemptionLoading: boolean
	handleClose: () => void
	handleSubmit: (id: number | undefined) => void
	handleAbsenceApplication: (id: number | undefined) => void
	handleExemptionApplication: (id: number | undefined) => void
}

export const SubmitModal = ({
	data,
	isOpen,
	handleClose,
	handleSubmit,
	handleAbsenceApplication,
	handleExemptionApplication,
	isLoading,
	isAbsenceLoading,
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
					<Box>{data?.name}</Box>
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
						<LoadingButton
							variant='outlined'
							color='secondary'
							size='small'
							loading={isAbsenceLoading}
							onClick={() => handleAbsenceApplication(data?.issue_id)}
						>
							公欠申請
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
					提出期限: {data?.due_date}
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
						>
							課題を提出する
						</LoadingButton>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}
