'use client'
import { Box, Button, Modal, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Issue } from '@/app/types/apiResponseTypes'

interface Props {
	data: Issue | null
	isOpen: boolean
	isLoading: boolean
	handleClose: () => void
	handleSubmit: () => void
}

export const SubmitModal = ({ data, isOpen, handleClose, handleSubmit, isLoading }: Props) => {
	return (
		<Modal open={isOpen} onClose={() => false} sx={{ border: 'none' }}>
			<form action={handleSubmit}>
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
					<Box sx={{ width: '250px', display: 'flex', gap: '20px', ml: 'auto' }}>
						<Button variant='text' onClick={handleClose}>
							キャンセル
						</Button>
						<LoadingButton loading={isLoading} variant='contained' type='submit'>
							課題を提出する
						</LoadingButton>
					</Box>
				</Box>
			</form>
		</Modal>
	)
}
