'use client'
import { Issue } from '@/app/types/apiResponseTypes'
import { UpdateAssignmentSchemaType, updateAssignmentSchema } from '@/app/types/form/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Box,
	Button,
	Modal,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Paper,
	Typography,
	FormControl,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
interface Props {
	isOpen: boolean
	currentIssueData: Issue | null
	handleClose: () => void
}

const steps = ['申請', '承認待ち', '承認済み']

export const DetailModal = ({ isOpen, currentIssueData, handleClose }: Props) => {
	const timezoneOffset = new Date().getTimezoneOffset() + 9 * 60 * 60 * 1000
	const theme = useTheme()
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<UpdateAssignmentSchemaType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(updateAssignmentSchema),
		defaultValues: {
			name: currentIssueData?.name,
			comment: currentIssueData?.comment,
			dueDates: undefined,
		},
	})

	currentIssueData?.issue_classes?.map((issueClass) => {
		console.log(dayjs(issueClass.due_date))
	})

	return (
		<Modal open={isOpen} onClose={() => false}>
			<Paper
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
					[theme.breakpoints.down('md')]: {
						maxWidth: '70%',
						padding: '20px 30px',
					},
					[theme.breakpoints.down('sm')]: {
						padding: '15px 20px',
					},
				}}
			>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					課題No.{currentIssueData?.task_number}
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					課題名: {currentIssueData?.name}
				</Box>
				<Box>
					{currentIssueData?.issue_classes?.map((issueClass) => (
						<Box
							key={issueClass.issue_class_id}
							sx={{
								mt: '10px',
								mb: '10px',
								border: '1px solid #ccc',
								borderRadius: '5px',
								p: '10px',
							}}
						>
							<Box>クラス名: {issueClass.department_name + issueClass?.class_name}</Box>
							<Box>
								提出期限:{' '}
								<FormControl>
									<Controller
										name={`dueDates.${issueClass.issue_class_id}`}
										control={control}
										render={({ field }) => {
											console.log(field.value)
											return (
												<DateTimePicker
													label='提出期限'
													ampm={false}
													defaultValue={dayjs(
														issueClass.due_date ? new Date(issueClass.due_date) : null,
													)}
													onChange={(value) => {
														field.onChange({
															dueDate: (value as Dayjs).toDate(),
														})
													}}
													slotProps={
														{
															// textField: {
															// 	error: isDueDateError,
															// },
														}
													}
												/>
											)
										}}
									/>
								</FormControl>
							</Box>
						</Box>
					))}
				</Box>
				<Box>コメント: {currentIssueData?.comment}</Box>
				<Box>公開設定: {currentIssueData?.private_flag ? '非公開' : '公開'}</Box>
				<Button onClick={handleClose}>閉じる</Button>
			</Paper>
		</Modal>
	)
}
