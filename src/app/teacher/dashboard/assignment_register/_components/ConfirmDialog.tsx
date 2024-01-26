import { AssignmentRegisterSchemaType } from '@/types/form/schema'
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
	if (!assignmentData) return
	const dueDates = assignmentData.dueDates?.filter((dueDate) => dueDate !== undefined)
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
					{dueDates?.map((dueDate, index) => (
						<Box key={dueDate?.classId}>
							<Box>{dueDate?.className}</Box>
							<Box>
								課題提出期限{index + 1}: {dueDate?.dueDate?.toDateString() || '未設定'}
							</Box>
						</Box>
					))}
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
