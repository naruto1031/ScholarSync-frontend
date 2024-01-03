'use client'
import { Box, Button, Modal, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Issue } from '@/app/types/apiResponseTypes'

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
				}}
			>
				<Box sx={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
					<h3>{data?.subjectName}</h3>
					<h3>課題No.{data?.issueID}</h3>
					<Box sx={{ display: 'flex', gap: '6px', ml: 'auto' }}>
						<LoadingButton
							variant='outlined'
							color='secondary'
							size='small'
							loading={isExemptionLoading}
							onClick={() => handleExemptionApplication(data?.issueID)}
						>
							免除申請
						</LoadingButton>
						<LoadingButton
							variant='outlined'
							color='secondary'
							size='small'
							loading={isAbsenceLoading}
							onClick={() => handleAbsenceApplication(data?.issueID)}
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
					<h3>{data?.issueName}</h3>
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						color: '#929292',
					}}
				>
					<h3>提出期限: {data?.dueDate}</h3>
				</Box>
				<Box
					sx={{
						marginTop: '10px',
						marginBottom: '40px',
					}}
				>
					<TextField id='standard-basic' label='一言メッセージ' variant='standard' fullWidth />
				</Box>
				<Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
					<Box sx={{ display: 'flex', gap: '20px', ml: 'auto' }}>
						<Button variant='text' onClick={handleClose} size='large'>
							キャンセル
						</Button>
						<LoadingButton
							loading={isLoading}
							variant='contained'
							size='large'
							onClick={() => handleSubmit(data?.issueID)}
						>
							課題を提出する
						</LoadingButton>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}
