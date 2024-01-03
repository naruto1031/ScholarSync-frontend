import { Snackbar, Alert } from '@mui/material'

interface Props {
	message: string
	severity: 'success' | 'info' | 'warning' | 'error'
	open: boolean
	handleClose: () => void
}
export const Toast = ({ message, severity, open, handleClose }: Props) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Alert variant='filled' severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	)
}
