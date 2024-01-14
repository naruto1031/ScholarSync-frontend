import { AssignmentRegisterSchemaType } from '@/app/types/form/schema'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Box,
} from '@mui/material'

export interface DialogProps {
	open: boolean
	handleClose: (value: string) => void
	assignmentData?: AssignmentRegisterSchemaType
}
export const ConfirmDialog = ({ open, assignmentData, handleClose }: DialogProps) => {
	return (
		<Dialog
			open={open}
			onClose={() => handleClose('close')}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{'課題を登録しますか？'}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					<Box>課題名: {assignmentData?.name}</Box>
					<Box>課題番号: {assignmentData?.taskNumber}</Box>
					<Box>提出期限: {assignmentData?.dueDate.toString()}</Box>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleClose('close')}>キャンセル</Button>
				<Button onClick={() => handleClose('ok')} autoFocus>
					登録する
				</Button>
			</DialogActions>
		</Dialog>
	)
}
