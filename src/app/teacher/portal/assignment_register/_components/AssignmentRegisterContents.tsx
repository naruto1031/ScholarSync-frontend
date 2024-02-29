'use client'
import { TeacherSubjectAssign } from '@/types/api-response-types'
import { AssignmentRegisterSchemaType, assignmentRegisterSchema } from '@/types/form/schema'
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
}

export const AssignmentRegisterContents = ({ teacherSubjects }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [dialogConfig, setDialogConfig] = useState<DialogProps | undefined>()
	const [open, setOpen] = useState(false)
	const [isDueDateError, setIsDueDateError] = useState<boolean>(false)

	const onBlurDueDateChange = () => {
		let isSetDueDate = 0
		watch('dueDates')?.forEach((dueDate) => {
			if (dueDate && dueDate.dueDate) {
				isSetDueDate++
			}
		})
		if (isSetDueDate === 0) {
			setIsDueDateError(true)
			return
		}
		setIsDueDateError(false)
	}

	const groupedClassesByTeacherSubject = teacherSubjects.reduce<{ [key: string]: number[] }>(
		(accumulator, teacherSubject) => {
			accumulator[teacherSubject.teacher_subject_id] = teacherSubject.departments.reduce<number[]>(
				(deptAccumulator, department) => {
					const classIds = department.classes.map((cl) => cl.class_id)
					return deptAccumulator.concat(classIds)
				},
				[],
			)
			return accumulator
		},
		{},
	)

	const onSubmit = async ({
		teacherSubjectId,
		name,
		taskNumber,
		dueDates,
		privateFlag,
		challengeFlag,
		challengeMaxScore,
		comment,
		isNotify,
	}: AssignmentRegisterSchemaType) => {
		try {
			onBlurDueDateChange()
			setIsDueDateError(false)
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
						dueDates,
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
			const dueDatesData = dueDates?.filter((dueDate) => dueDate !== undefined)
			const dueDateClassIds: (number | undefined)[] | undefined = dueDatesData?.map(
				(dueDate) => dueDate?.classId,
			)
			const unSetClassIds = Object.values(groupedClassesByTeacherSubject[teacherSubjectId]).filter(
				(classId) => {
					return !dueDateClassIds?.includes(classId)
				},
			)
			unSetClassIds.forEach((classId) => {
				dueDatesData?.push({
					dueDate: undefined,
					classId,
					className: '',
				})
			})

			const res = await fetch('/api/assignment/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					teacherSubjectId,
					name,
					taskNumber,
					dueDates: dueDatesData,
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

			const data = await res.json()
			const subject = teacherSubjects.find(
				(subject) => subject.teacher_subject_id === Number(teacherSubjectId),
			)?.name

			if (isNotify) {
				dueDatesData?.forEach(async (dueDate) => {
					const res = await fetch('/api/notify', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							classId: dueDate?.classId.toString(),
							subject: subject,
							title: `【${subject}】課題表紙が作成されました`,
							memo: `課題名: ${name}\n課題No: ${taskNumber}\n下記URLから詳細な課題表紙情報をご確認ください。\n\nhttps://www.scholar-sync.systems/student/portal/submit_assignment?issue_id=${data.issue_id}`,
						}),
					})

					if (!res.ok) {
						console.error(res.statusText)
						throw new Error('エラーが発生しました')
					}
				})
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
			dueDates: undefined,
			privateFlag: false,
			challengeFlag: false,
			challengeMaxScore: 0,
			comment: '',
			isNotify: true,
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
						fontWeight: 'bold',
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
						<MenuItem value={undefined}>選択してください</MenuItem>
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
								fontWeight: 'bold',
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
								fontWeight: 'bold',
								mb: '10px',
							}}
						>
							提出期限を入力(必ず一クラス以上設定)
						</Box>
						{isDueDateError && (
							<FormHelperText
								error
								sx={{
									mb: '20px',
									fontWeight: 'bold',
									fontSize: '14px',
								}}
							>
								提出期限を一つ以上入力してください
							</FormHelperText>
						)}
						{teacherSubjects
							.find((subject) => subject.teacher_subject_id === Number(watch('teacherSubjectId')))
							?.departments.map((department) =>
								department.classes.map((classData) => (
									<Box key={classData.class_id}>
										<Box
											sx={{
												mb: '10px',
											}}
										>
											{department.name}
											{classData.name}
										</Box>
										<FormControl sx={{ width: '100%', mb: '20px' }}>
											<Controller
												control={control}
												name={`dueDates.${classData.class_id}`}
												render={({ field }) => (
													<DateTimePicker
														label='提出期限'
														ampm={false}
														timeSteps={{
															minutes: 1,
														}}
														onChange={(value) => {
															field.onChange({
																dueDate: (value as Dayjs).toDate(),
																classId: classData.class_id,
																className: department.name + classData.name,
															})
															onBlurDueDateChange()
														}}
														slotProps={{
															textField: {
																error: isDueDateError,
																onBlur: () => {
																	onBlurDueDateChange()
																},
															},
														}}
													/>
												)}
											/>
										</FormControl>
									</Box>
								)),
							)}
						<Box
							sx={{
								mb: '10px',
								fontWeight: 'bold',
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
								fontWeight: 'bold',
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
								fontWeight: 'bold',
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
								fontWeight: 'bold',
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
										fontWeight: 'bold',
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
						<Box
							sx={{
								fontWeight: 'bold',
								mb: '10px',
							}}
						>
							生徒に課題表紙登録を通知する
						</Box>
						<FormControl sx={{ width: 'fit-content', mb: '20px' }}>
							<FormControlLabel
								control={<Checkbox {...register('isNotify')} defaultChecked={true} />}
								label='通知する'
							/>
						</FormControl>
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
