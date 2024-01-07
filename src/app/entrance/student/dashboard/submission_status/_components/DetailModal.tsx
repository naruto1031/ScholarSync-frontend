'use client'
import { Box, Button, Modal, Step, StepLabel, Stepper, TextField } from '@mui/material'

interface Props {
	isOpen: boolean
	handleClose: () => void
}

const steps = ['申請', '承認待ち', '承認済み']

export const DetailModal = ({ isOpen, handleClose }: Props) => {
	return (
		<Modal open={isOpen} onClose={() => false}>
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
					<Box>test</Box>
					<Box>課題No.test</Box>
				</Box>
				<Box
					sx={{
						fontSize: '32px',
						fontWeight: 'bold',
					}}
				>
					<Box>testName</Box>
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						color: '#929292',
					}}
				>
					<Box>提出期限: sssss</Box>
				</Box>
				<Box
					sx={{
						marginTop: '10px',
						marginBottom: '40px',
					}}
				>
					<Box sx={{ width: '100%' }}>
						<Stepper activeStep={1} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
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
			</Box>
		</Modal>
	)
}
