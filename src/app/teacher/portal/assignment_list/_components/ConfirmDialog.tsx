import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Box,
} from '@mui/material'

export interface DeleteDialogProps {
	open: boolean
	handleClose: (value: string) => void
}

export const ConfirmDialog = ({ open, handleClose }: DeleteDialogProps) => {
	console.log('DeleteDialogProps', open, handleClose)
	return (
		<Dialog
			open={open}
			onClose={() => handleClose('close')}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>この課題を削除しますか？</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					<Box
						sx={{
							mb: 1,
						}}
					>
						一度削除した課題は復元できません。
					</Box>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleClose('close')}>キャンセル</Button>
				<Button onClick={() => handleClose('ok')} variant='contained' autoFocus>
					削除する
				</Button>
			</DialogActions>
		</Dialog>
	)
}
