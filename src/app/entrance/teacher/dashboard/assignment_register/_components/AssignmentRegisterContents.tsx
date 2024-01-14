'use client'
import { Department, TeacherSubjectAssign } from '@/app/types/apiResponseTypes'
import { AssignmentRegisterSchemaType, assignmentRegisterSchema } from '@/app/types/form/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Input,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers'
import { LoadingButton } from '@mui/lab'
import { Dayjs } from 'dayjs'
import { ConfirmDialog, DialogProps } from './ConfirmDialog'
import { Toast } from '@/app/components'

interface Props {
	teacherSubjects: TeacherSubjectAssign[]
	departments: Department[]
}

export const AssignmentRegisterContents = ({ teacherSubjects, departments }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [dialogConfig, setDialogConfig] = useState<DialogProps | undefined>()
	const [open, setOpen] = useState(false)

	const onSubmit = async ({
		teacherSubjectId,
		name,
		taskNumber,
		dueDate,
		departmentIds,
		privateFlag,
		challengeFlag,
		challengeMaxScore,
		comment,
	}: AssignmentRegisterSchemaType) => {
		try {
			setIsLoading(true)
			setOpen(true)
			const ret = await new Promise((resolve) => {
				setDialogConfig({
					open: open,
					handleClose: (value) => {
						resolve(value)
						setOpen(false)
					},
					assignmentData: {
						teacherSubjectId,
						name,
						taskNumber,
						dueDate,
						departmentIds,
						privateFlag,
						challengeFlag,
						challengeMaxScore,
						comment,
					},
				})
			})
			if (ret === 'close') {
				setIsLoading(false)
				return
			}
			const res = await fetch('/api/assignment/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					teacherSubjectId,
					name,
					taskNumber,
					dueDate,
					departmentIds,
					privateFlag,
					challengeFlag,
					challengeMaxScore,
					comment,
				}),
			})

			if (!res.ok) {
				setIsError(true)
				setIsLoading(false)
				console.error(res.statusText)
				throw new Error('エラーが発生しました')
			}

			setIsSuccess(true)
			setIsLoading(false)
			reset()
		} catch (error: unknown) {
			if (error instanceof Error) {
				setIsError(true)
				console.error(error)
			}
			return
		}
	}

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm<AssignmentRegisterSchemaType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(assignmentRegisterSchema),
		defaultValues: {
			teacherSubjectId: '',
			name: '',
			taskNumber: '',
			dueDate: undefined,
			departmentIds: undefined,
			privateFlag: false,
			challengeFlag: false,
			challengeMaxScore: 0,
			comment: '',
		},
	})

	return (
		<Box>
			<Paper
				sx={{
					py: '20px',
					px: '40px',
					my: '20px',
				}}
			>
				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '20px',
						mb: '20px',
					}}
				>
					課題登録
				</Box>

				<Box
					sx={{
						mb: '10px',
					}}
				>
					課題を作成する科目を設定
				</Box>
				<FormControl sx={{ width: '100%', mb: '20px' }}>
					<InputLabel id='teacher-subjects'>担当教科</InputLabel>
					<Select
						labelId='teacher-subjects'
						label='担当教科'
						error={!!errors.teacherSubjectId}
						{...register('teacherSubjectId')}
						disabled={isLoading}
						defaultValue={undefined}
					>
						{teacherSubjects.map((subject) => (
							<MenuItem key={subject.teacher_subject_id} value={`${subject.teacher_subject_id}`}>
								{subject.name}
							</MenuItem>
						))}
					</Select>
					{errors.teacherSubjectId?.message && (
						<FormHelperText error>{errors.teacherSubjectId?.message}</FormHelperText>
					)}
				</FormControl>
				{watch('teacherSubjectId') && (
					<Box>
						<Box
							sx={{
								mb: '10px',
							}}
						>
							課題名を入力
						</Box>
						<FormControl sx={{ width: '100%', mb: '20px' }}>
							<TextField
								label='課題名'
								variant='outlined'
								error={!!errors.name}
								helperText={errors.name?.message}
								sx={{
									mb: '20px',
								}}
								{...register('name')}
								disabled={isLoading}
							/>
						</FormControl>

						<Box
							sx={{
								mb: '10px',
							}}
						>
							提出期限を入力
						</Box>
						<FormControl sx={{ width: '100%', mb: '20px' }}>
							<Controller
								control={control}
								name='dueDate'
								render={({ field }) => (
									<DateTimePicker
										label='提出期限'
										onChange={(value) => {
											field.onChange((value as Dayjs).toDate())
										}}
										slotProps={{
											textField: {
												error: !!errors.dueDate,
												onBlur: () => {
													field.onBlur()
												},
											},
										}}
									/>
								)}
							/>
							{errors.dueDate?.message && (
								<FormHelperText error>{errors.dueDate?.message}</FormHelperText>
							)}
						</FormControl>
						<Box
							sx={{
								mb: '10px',
							}}
						>
							課題を提示する学科を設定
						</Box>
						<FormControl sx={{ width: '100%', mb: '20px' }}>
							<InputLabel id='teacher-subjects'>提示学科</InputLabel>
							<Select
								labelId='teacher-subjects'
								label='提示学科'
								error={!!errors.departmentIds}
								{...register('departmentIds')}
								disabled={isLoading}
								multiple
								defaultValue={[]}
							>
								{departments.map((department) => (
									<MenuItem key={department.department_id} value={`${department.department_id}`}>
										{department.name}
									</MenuItem>
								))}
							</Select>
							{errors.departmentIds?.message && (
								<FormHelperText error>{errors.departmentIds?.message}</FormHelperText>
							)}
							<FormHelperText>複数選択可</FormHelperText>
						</FormControl>
						<Box
							sx={{
								mb: '10px',
							}}
						>
							課題番号を入力
						</Box>
						<FormControl sx={{ width: '100%', mb: '20px' }}>
							<TextField
								label='課題番号'
								variant='outlined'
								error={!!errors.taskNumber}
								helperText={errors.taskNumber?.message}
								sx={{
									mb: '20px',
								}}
								{...register('taskNumber')}
								disabled={isLoading}
							/>
						</FormControl>
						<Box
							sx={{
								mb: '10px',
							}}
						>
							コメントを入力(任意)
						</Box>
						<FormControl sx={{ width: '100%', mb: '20px' }}>
							<TextField
								label='課題番号'
								variant='outlined'
								error={!!errors.comment}
								helperText={errors.comment?.message}
								sx={{
									mb: '20px',
								}}
								{...register('comment')}
								disabled={isLoading}
							/>
						</FormControl>
						<Box
							sx={{
								mb: '10px',
							}}
						>
							課題を非公開にする(一覧画面から変更できます)
						</Box>
						<FormControl sx={{ width: '100%', mb: '20px' }}>
							<FormControlLabel
								control={<Checkbox {...register('privateFlag')} defaultChecked={false} />}
								label='非公開にする'
							/>
						</FormControl>

						<Box
							sx={{
								mb: '10px',
							}}
						>
							チャレンジ課題を作成する
						</Box>
						<FormControl sx={{ width: '100%', mb: '20px' }}>
							<FormControlLabel
								control={<Checkbox {...register('challengeFlag')} defaultChecked={false} />}
								label='チャレンジ問題'
							/>
						</FormControl>
						{watch('challengeFlag') && (
							<Box>
								<Box
									sx={{
										mb: '10px',
									}}
								>
									チャレンジ問題の満点を入力
								</Box>
								<FormControl sx={{ width: '100%', mb: '20px' }}>
									<Controller
										control={control}
										name='challengeMaxScore'
										render={({ field }) => (
											<Input
												placeholder='満点を入力してください'
												type='number'
												defaultValue={0}
												error={!!errors.challengeMaxScore}
												onChange={(e) => field.onChange(Number(e.target.value))}
												onBlur={() => field.onBlur()}
											/>
										)}
									/>
									{errors.challengeMaxScore?.message && (
										<FormHelperText error>{errors.challengeMaxScore?.message}</FormHelperText>
									)}
								</FormControl>
							</Box>
						)}
						<LoadingButton
							color='primary'
							variant='contained'
							sx={{
								padding: '10px 20px',
								mb: '20px',
							}}
							onClick={handleSubmit(onSubmit)}
							disabled={isLoading}
							loading={isLoading}
						>
							登録確認へ
						</LoadingButton>
					</Box>
				)}
			</Paper>
			<ConfirmDialog
				open={open}
				handleClose={dialogConfig?.handleClose || (() => {})}
				assignmentData={dialogConfig?.assignmentData}
			/>
			<Toast
				open={isError}
				handleClose={() => setIsError(false)}
				severity='error'
				message='エラーが発生しました'
			/>
			<Toast
				open={isSuccess}
				handleClose={() => setIsSuccess(false)}
				severity='success'
				message='課題を登録しました'
			/>
		</Box>
	)
}
