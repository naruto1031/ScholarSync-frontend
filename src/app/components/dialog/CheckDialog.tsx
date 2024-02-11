import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
	Box,
} from '@mui/material'
import Image from 'next/image'

export interface ConfirmDialogProps {
	onClose: (value: string) => void
	title?: string
	message?: string
}

export const CheckDialog = ({ onClose, title, message }: ConfirmDialogProps) => {
	return (
		<Dialog open onClose={() => onClose('close')}>
			<DialogTitle>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Box
						sx={{
							mt: '5px',
						}}
					>
						<Image
							src='/room_notify_v2_icon_clear.png'
							width={30}
							height={30}
							alt='room_notify_v2_icon_clear'
						/>
					</Box>
					<Box>{title}</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose('cancel')} autoFocus>
					Cancel
				</Button>
				<Button onClick={() => onClose('ok')}>OK</Button>
			</DialogActions>
		</Dialog>
	)
}
